import {
    ForbiddenException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Course } from './entity/course.entity';
import { CourseRepository } from '@repositories/course.repository';
import { CreateCourseDto } from './dto/createCourse.dto';
import { User } from '@modules/users/entity/user.entity';
import { SupervisorCourseService } from '@modules/supervisor_course/supervisor_course.service';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { UpdateResult } from 'typeorm';
import { CourseSubjectService } from '@modules/course_subject/course_subject.service';
import { UpdateSubjectForCourseDto } from './dto/UpdateSubjectForTask.dto';
import { CourseSubject } from '@modules/course_subject/entity/course_subject.entity';
import { DeleteSubjectCourseDto } from './dto/deleteSubject.dto';
import { EmailDto } from 'src/common/dto/email.dto';
import { UsersService } from '@modules/users/user.services';
import { ERolesUser } from '@modules/users/enums/index.enum';
import { FindCourseDto } from './dto/findCourse.dto';
import { getLimitAndSkipHelper } from 'src/helper/pagination.helper';
import { UserCourseService } from '@modules/user_course/user_course.service';
import { TraineeDto, UpdateStatusTraineeDto } from './dto/trainee.dto';
import { AppResponse } from 'src/types/common.type';
import { UserCourse } from '@modules/user_course/entity/user_course.entity';

@Injectable()
export class CourseService extends BaseServiceAbstract<Course> {
    constructor(
        @Inject('COURSE_REPOSITORY')
        private readonly courseRepository: CourseRepository,
        @Inject(forwardRef(() => SupervisorCourseService))
        private readonly supervisorCourseService: SupervisorCourseService,
        private readonly courseSubjectService: CourseSubjectService,
        private readonly userService: UsersService,
        private readonly userCourseService: UserCourseService,
    ) {
        super(courseRepository);
    }

    async createNewCourse(dto: CreateCourseDto, user: User): Promise<Course> {
        const { startDate, endDate, ...data } = dto;
        const newCourse = await this.courseRepository.create({
            ...data,
            startDate: this._parseDateString(startDate),
            endDate: this._parseDateString(endDate),
            creator: user,
        });
        await this.supervisorCourseService.create({
            course: newCourse,
            user: user,
        });
        return newCourse;
    }

    async addTraineeForCourse(dto: TraineeDto, user: User): Promise<AppResponse<UserCourse>> {
        const { email, courseId } = dto;
        console.log(email, courseId);
        await this._checkUserIsSupervisorOfCourse(courseId, user);
        const trainee = await this.userService.findByEmail(email);
        if (!trainee) {
            throw new NotFoundException('courses.Trainee not found');
        }
        return await this.userCourseService.handleAddTraineeForCouse(trainee, courseId);
    }

    async deleteTraineeForCourse(userCourseId: string, user: User): Promise<AppResponse<boolean>> {
        const userCourse = await this.userCourseService.findOneByCondition(
            { id: userCourseId },
            { relations: ['course'] },
        );
        await this._checkUserIsSupervisorOfCourse(userCourse.course.id, user);
        try {
            return {
                data: await this.userCourseService.remove(userCourseId),
            };
        } catch (error) {
            console.log(error);
            throw new UnprocessableEntityException('courses.Remove trainee failed');
        }
    }

    async updateTraineeStatus(
        userCourseId: string,
        user: User,
        dto: UpdateStatusTraineeDto,
    ): Promise<AppResponse<UserCourse>> {
        const userCourse = await this.userCourseService.findOneByCondition(
            { id: userCourseId },
            { relations: ['course'] },
        );
        await this._checkUserIsSupervisorOfCourse(userCourse.course.id, user);
        return {
            data: await this.userCourseService.update(userCourseId, dto),
        };
    }

    async supervisorFindCourse(dto: FindCourseDto, user: User): Promise<Course[]> {
        const { name, creatorName, page, pageSize } = dto;
        const { limit, skip } = getLimitAndSkipHelper(page, pageSize);

        const queryBuilder = this.courseRepository
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.supervisorCourses', 'supervisorCourses')
            .where('supervisorCourses.userId = :userId', { userId: user.id });

        if (name) {
            queryBuilder.andWhere('course.name ILIKE :name', {
                name: `%${name}%`,
            });
        }

        if (creatorName) {
            queryBuilder.andWhere('creator.name ILIKE :creatorName', {
                creatorName: `%${creatorName}%`,
            });
        }

        queryBuilder.skip(skip).take(limit);

        return await queryBuilder.getMany();
    }

    async getCourseForTrainee(dto: FindCourseDto, user: User): Promise<AppResponse<Course[]>> {
        const { name, creatorName, page, pageSize } = dto;
        const { limit, skip } = getLimitAndSkipHelper(page, pageSize);

        const queryBuilder = this.courseRepository
            .createQueryBuilder('course')
            .innerJoinAndSelect('course.userCourses', 'userCourses')
            .where('userCourses.userId = :userId', { userId: user.id });

        if (name) {
            queryBuilder.andWhere('course.name ILIKE :name', {
                name: `%${name}%`,
            });
        }

        if (creatorName) {
            queryBuilder.andWhere('creator.name ILIKE :creatorName', {
                creatorName: `%${creatorName}%`,
            });
        }

        queryBuilder.skip(skip).take(limit);

        return {
            data: await queryBuilder.getMany(),
        };
    }

    async _getCourseDetail(courseId: string): Promise<Course> {
        const course = await this.courseRepository
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.courseSubjects', 'courseSubject')
            .leftJoinAndSelect('courseSubject.subject', 'subject')
            .leftJoinAndSelect('subject.tasksCreated', 'task')
            .where('course.id = :courseId', { courseId })
            .getOne();

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return course;
    }

    async getCourseDetailForSupervisor(courseId: string, user: User): Promise<Course> {
        const userIsSupervisorOfCourse = await this.supervisorCourseService.findOneByCondition({
            course: {
                id: courseId,
            },
            user: {
                id: user.id,
            },
        });
        if (userIsSupervisorOfCourse) {
            return await this._getCourseDetail(courseId);
        } else {
            throw new ForbiddenException('auths.Forbidden Resource');
        }
    }

    async getCourseDetailForTrainee(courseId: string, user: User): Promise<AppResponse<Course>> {
        const userIsTraineeOfCourse = await this.userCourseService.findOneByCondition({
            user: { id: user.id },
            course: { id: courseId },
        });
        if (!userIsTraineeOfCourse) {
            throw new ForbiddenException('auths.Forbidden Resource');
        } else {
            return {
                data: await this._getCourseDetail(courseId),
            };
        }
    }

    async updateCourseInfo(dto: UpdateCourseDto, user: User, id: string): Promise<UpdateResult> {
        await this._checkUserPermissionForCourse(id, user);
        return await this.courseRepository.update(id, dto);
    }

    async updateSubjectForCourse(dto: UpdateSubjectForCourseDto, user: User, id: string): Promise<CourseSubject[]> {
        const { subjectIds } = dto;
        await this._checkUserPermissionForCourse(id, user);
        return await this.courseSubjectService.updateSubjectCourse(id, subjectIds);
    }

    async deleteCourse(id: string, user: User): Promise<UpdateResult> {
        await this._checkUserPermissionForCourse(id, user);
        await this.courseSubjectService.deleteByCourseId(id);
        return await this.courseRepository.softDelete(id);
    }

    async deleteSubjectForCourse(id: string, { subjectId }: DeleteSubjectCourseDto, user: User): Promise<UpdateResult> {
        await this._checkUserPermissionForCourse(id, user);
        await this.courseSubjectService.deleteByCourseAndSubjectId(id, subjectId);
        return await this.courseRepository.softDelete(id);
    }

    async _checkUserPermissionForCourse(courseId: string, user: User): Promise<void> {
        const course = await this.courseRepository.findOneByCondition(
            {
                id: courseId,
            },
            {
                relations: ['creator'],
            },
        );
        console.log(course);
        if (!course) {
            throw new NotFoundException('course.Course not found');
        }
        // console.log(course, course.creator)
        if (user.id !== course.creator.id) {
            throw new ForbiddenException('Unauthorized');
        }
    }

    async _checkUserIsSupervisorOfCourse(courseId: string, user: User): Promise<boolean> {
        console.log(user, courseId, 'Hihihi');
        const supervisorCourse = await this.supervisorCourseService.findOneByCondition({
            course: { id: courseId },
            user: { id: user.id },
        });
        console.log(supervisorCourse);
        if (!supervisorCourse) {
            return false;
        }
        return true;
    }

    async addSupervisor({ email }: EmailDto, courseId: string, user: User) {
        const checkUserHasPermission = await this.supervisorCourseService.findOneByCondition({
            user: { id: user.id },
            course: { id: courseId },
        });
        if (!checkUserHasPermission) {
            throw new ForbiddenException("language.You don't have permission to do this");
        }
        const newSupervisor = await this.userService.findByEmail(email);
        if (!newSupervisor || newSupervisor.role !== ERolesUser.SUPERVISOR) {
            throw new UnprocessableEntityException("language.The supervisor's email is not valid");
        }
        return await this.supervisorCourseService.create({
            course: { id: courseId },
            user: { id: user.id },
        });
    }

    _parseDateString(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }
}

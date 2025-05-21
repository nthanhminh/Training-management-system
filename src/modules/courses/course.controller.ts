import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCourseDto } from './dto/createCourse.dto';
import { AppResponse, ResponseMessage } from 'src/types/common.type';
import { CourseService } from './course.service';
import { Course } from './entity/course.entity';
import { CurrentUserDecorator } from 'src/decorators/current-user.decorator';
import { User } from '@modules/users/entity/user.entity';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { UpdateResult } from 'typeorm';
import { UpdateSubjectForCourseDto } from './dto/UpdateSubjectForTask.dto';
import { CourseSubject } from '@modules/course_subject/entity/course_subject.entity';
import { DeleteSubjectCourseDto } from './dto/deleteSubject.dto';
import { EmailDto } from 'src/common/dto/email.dto';
import { SupervisorCourse } from '@modules/supervisor_course/entity/supervisor_course.entity';
import { FindCourseDto } from './dto/findCourse.dto';
import { RemoveCreatorInterceptor } from 'src/interceptors/removeCreator.interceptor';
import { TraineeDto, UpdateStatusTraineeDto } from './dto/trainee.dto';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { SessionAuthGuard } from '@modules/auth/guards/session.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ERolesUser } from '@modules/users/enums/index.enum';
import { UserCourse } from '@modules/user_course/entity/user_course.entity';

@Controller('courses')
@ApiTags('courses')
@UseInterceptors(RemoveCreatorInterceptor)
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get('supervisor')
    async getCourseBySupervisor(
        @Query() dto: FindCourseDto,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<Course[]>> {
        return {
            data: await this.courseService.supervisorFindCourse(dto, user),
        };
    }

    @Get('supervisor/:courseId')
    async getCourseDetailBySupervisor(
        @Param('courseId') courseId: string,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<Course>> {
        return {
            data: await this.courseService.getCourseDetailForSupervisor(courseId, user),
        };
    }

    @Roles(ERolesUser.SUPERVISOR)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Post('trainee')
    async addTrainee(@Body() dto: TraineeDto, @CurrentUserDecorator() user: User): Promise<AppResponse<UserCourse>> {
        return await this.courseService.addTraineeForCourse(dto, user);
    }

    @Roles(ERolesUser.SUPERVISOR)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Patch('trainee/:userCourseId')
    async updateTrainee(
        @Param('userCourseId') userCourseId: string,
        @CurrentUserDecorator() user: User,
        @Body() dto: UpdateStatusTraineeDto,
    ): Promise<AppResponse<UserCourse>> {
        return await this.courseService.updateTraineeStatus(userCourseId, user, dto);
    }

    @Roles(ERolesUser.SUPERVISOR)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Delete('trainee/:userCourseId')
    async removeTrainee(
        @Param('userCourseId') userCourseId: string,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<boolean>> {
        return await this.courseService.deleteTraineeForCourse(userCourseId, user);
    }

    @Post()
    async createCourse(@Body() dto: CreateCourseDto, @CurrentUserDecorator() user: User): Promise<AppResponse<Course>> {
        return {
            data: await this.courseService.createNewCourse(dto, user),
        };
    }

    @Patch('subject/:id')
    async updateCourse(
        @Body() dto: UpdateSubjectForCourseDto,
        @CurrentUserDecorator() user: User,
        @Param('id') id: string,
    ): Promise<AppResponse<CourseSubject[]>> {
        console.log(dto, user, id);
        return {
            data: await this.courseService.updateSubjectForCourse(dto, user, id),
        };
    }

    @Patch('info/:id')
    async updateSubjectCourse(
        @Body() dto: UpdateCourseDto,
        @CurrentUserDecorator() user: User,
        @Param('id') id: string,
    ): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.courseService.updateCourseInfo(dto, user, id),
        };
    }

    @Patch('supervisor/:id')
    async addNewSupervisor(
        @Body() dto: EmailDto,
        @CurrentUserDecorator() user: User,
        @Param('id') id: string,
    ): Promise<AppResponse<SupervisorCourse>> {
        return {
            data: await this.courseService.addSupervisor(dto, id, user),
        };
    }

    @Delete(':id')
    async deleteOneCourse(
        @Param('id') id: string,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.courseService.deleteCourse(id, user),
        };
    }

    @Delete('sub/:id')
    async deleteSubjectCourse(
        @Param('id') id: string,
        @Body() dto: DeleteSubjectCourseDto,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.courseService.deleteSubjectForCourse(id, dto, user),
        };
    }
}

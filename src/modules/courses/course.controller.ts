import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { AppResponse } from "src/types/common.type";
import { CourseService } from "./course.service";
import { Course } from "./entity/course.entity";
import { CurrentUserDecorator } from "src/decorators/current-user.decorator";
import { User } from "@modules/users/entity/user.entity";
import { UpdateCourseDto } from "./dto/updateCourse.dto";
import { UpdateResult } from "typeorm";
import { UpdateSubjectForCourseDto } from "./dto/UpdateSubjectForTask.dto";
import { CourseSubject } from "@modules/course_subject/entity/course_subject.entity";
import { DeleteSubjectCourseDto } from "./dto/deleteSubject.dto";
import { EmailDto } from "src/common/dto/email.dto";
import { SupervisorCourse } from "@modules/supervisor_course/entity/supervisor_course.entity";

@Controller('courses')
@ApiTags('courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) {}
    @Post()
    async createCourse(@Body() dto: CreateCourseDto, @CurrentUserDecorator() user: User) : Promise<AppResponse<Course>> {
        return {
            data: await this.courseService.createNewCourse(dto, user)
        }
    }

    @Patch('subject/:id')
    async updateCourse(@Body() dto: UpdateSubjectForCourseDto, @CurrentUserDecorator() user: User, @Param('id') id: string) : Promise<AppResponse<CourseSubject[]>> {
        return {
            data: await this.courseService.updateSubjectForCourse(dto, user, id)
        }
    }
    @Patch('info/:id')
    async updateSubjectCourse(@Body() dto: UpdateCourseDto, @CurrentUserDecorator() user: User, @Param('id') id: string) : Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.courseService.updateCourseInfo(dto, user, id)
        }
    }

    @Patch('supervisor/:id')
    async addNewSupervisor(@Body() dto: EmailDto, @CurrentUserDecorator() user: User, @Param('id') id: string) : Promise<AppResponse<SupervisorCourse>> {
        return {
            data: await this.courseService.addSupervisor(dto, id, user)
        }
    }

    @Delete(':id')
    async deleteOneCourse(@Param('id') id: string, @CurrentUserDecorator() user: User) : Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.courseService.deleteCourse(id, user)
        }
    }

    @Delete('sub/:id')
    async deleteSubjectCourse(@Param('id') id: string, @Body() dto: DeleteSubjectCourseDto, @CurrentUserDecorator() user: User) : Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.courseService.deleteSubjectForCourse(id, dto, user)
        }
    }
}
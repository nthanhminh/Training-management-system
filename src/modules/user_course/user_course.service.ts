import { Inject, Injectable } from "@nestjs/common";
import { BaseServiceAbstract } from "src/services/base/base.abstract.service";
import { UserCourse } from "./entity/user_course.entity";
import { UserCourseRepository } from "@repositories/user_course.repository";

@Injectable()
export class UserCourseService extends BaseServiceAbstract<UserCourse> {
    constructor(
        @Inject('USER_COURSE_REPOSITORY')
        private readonly userCourseRepository: UserCourseRepository
    ) {
        super(userCourseRepository);
    }
}
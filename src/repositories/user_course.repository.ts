import { UserCourse } from "@modules/user_course/entity/user_course.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { DataSource } from "typeorm";

export class UserCourseRepository extends BaseRepositoryAbstract<UserCourse> {
    constructor(dataSource: DataSource) {
        super(UserCourse, dataSource);
    }
}
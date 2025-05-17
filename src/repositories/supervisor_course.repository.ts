import { SupervisorCourse } from '@modules/supervisor_course/entity/supervisor_course.entity';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { DataSource } from 'typeorm';

export class SupervisorCourseRepository extends BaseRepositoryAbstract<SupervisorCourse> {
    constructor(dataSource: DataSource) {
        super(SupervisorCourse, dataSource);
    }
}

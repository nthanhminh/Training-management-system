import { DataSource } from 'typeorm';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { Course } from '@modules/courses/entity/course.entity';

export class CourseRepository extends BaseRepositoryAbstract<Course> {
    constructor(dataSource: DataSource) {
        super(Course, dataSource);
    }
}

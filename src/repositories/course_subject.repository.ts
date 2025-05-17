import { CourseSubject } from '@modules/course_subject/entity/course_subject.entity';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { DataSource } from 'typeorm';

export class CourseSubjectRepository extends BaseRepositoryAbstract<CourseSubject> {
    constructor(dataSource: DataSource) {
        super(CourseSubject, dataSource);
    }
}

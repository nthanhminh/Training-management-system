import { DataSource } from 'typeorm';
import { CourseSubjectRepository } from '@repositories/course_subject.repository';

export const courseSubjectProviders = [
  {
    provide: 'COURSE_SUBJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => new CourseSubjectRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];

import { DataSource } from 'typeorm';
import { CourseRepository } from '@repositories/course.repository';

export const courseProviders = [
    {
        provide: 'COURSE_REPOSITORY',
        useFactory: (dataSource: DataSource) => new CourseRepository(dataSource),
        inject: ['DATA_SOURCE'],
    },
];

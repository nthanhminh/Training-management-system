import { DataSource } from 'typeorm';
import { UserCourseRepository } from '@repositories/user_course.repository';

export const userCourseProviders = [
    {
        provide: 'USER_COURSE_REPOSITORY',
        useFactory: (dataSource: DataSource) => new UserCourseRepository(dataSource),
        inject: ['DATA_SOURCE'],
    },
];

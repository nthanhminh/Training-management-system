import { DataSource } from 'typeorm';
import { SupervisorCourseRepository } from '@repositories/supervisor_course.repository';

export const supervisorCourseProviders = [
    {
        provide: 'SUPERVISOR_COURSE_REPOSITORY',
        useFactory: (dataSource: DataSource) => new SupervisorCourseRepository(dataSource),
        inject: ['DATA_SOURCE'],
    },
];

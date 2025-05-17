import { DataSource } from 'typeorm';
import { UserSubjectRepository } from '@repositories/user_subject.repository';

export const userSubjectProviders = [
    {
        provide: 'USER_SUBJECT_REPOSITORY',
        useFactory: (dataSource: DataSource) => new UserSubjectRepository(dataSource),
        inject: ['DATA_SOURCE'],
    },
];

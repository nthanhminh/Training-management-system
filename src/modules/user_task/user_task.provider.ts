import { DataSource } from 'typeorm';
import { UserTaskRepository } from '@repositories/user_task.repository';

export const userTaskProviders = [
    {
        provide: 'USER_TASK_REPOSITORY',
        useFactory: (dataSource: DataSource) => new UserTaskRepository(dataSource),
        inject: ['DATA_SOURCE'],
    },
];

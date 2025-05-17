import { DataSource } from 'typeorm';
import { TaskRepository } from '@repositories/task.repository';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => new TaskRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];

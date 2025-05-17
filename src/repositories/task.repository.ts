import { Task } from '@modules/tasks/entity/task.entity';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { DataSource } from 'typeorm';

export class TaskRepository extends BaseRepositoryAbstract<Task> {
    constructor(dataSource: DataSource) {
        super(Task, dataSource);
    }
}

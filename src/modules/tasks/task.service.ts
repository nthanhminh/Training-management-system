import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Task } from './entity/task.entity';
import { TaskRepository } from '@repositories/task.repository';

@Injectable()
export class TaskService extends BaseServiceAbstract<Task> {
    constructor(
        @Inject('TASK_REPOSITORY')
        private readonly taskRepository: TaskRepository,
    ) {
        super(taskRepository);
    }
}

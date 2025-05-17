import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Task } from './entity/task.entity';
import { TaskRepository } from '@repositories/task.repository';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateResult } from 'typeorm';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { SubjectService } from '@modules/subjects/subjects.service';
import { AppResponse } from 'src/types/common.type';
import { User } from '@modules/users/entity/user.entity';

@Injectable()
export class TaskService extends BaseServiceAbstract<Task> {
    constructor(
        @Inject('TASK_REPOSITORY')
        private readonly taskRepository: TaskRepository,
        @Inject(forwardRef(() => SubjectService))
        private readonly subjectService: SubjectService,
    ) {
        super(taskRepository);
    }

    async createTask(dto: CreateTaskDto): Promise<Task> {
        const { subjectId } = dto;
        const subject = await this.subjectService.findOne(subjectId);
        if (!subject) {
            throw new NotFoundException('tasks.Subject not found');
        }
        return await this.taskRepository.create({
            contentFileLink: dto.contentFileLink,
            subject: subject,
        });
    }

    async buildCreateNewTaskResponse(dto: CreateTaskDto): Promise<AppResponse<Task>> {
        return {
            data: await this.createTask(dto),
        };
    }

    async deleteTaskBySubjectId(subjectId: string): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.taskRepository.softDeleteMany({
                subject: {
                    id: subjectId,
                },
            }),
        };
    }

    async updateTask(taskId: string, dto: UpdateTaskDto): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.taskRepository.update(taskId, dto),
        };
    }

    async deleteTaskById(taskId: string, user: User): Promise<AppResponse<UpdateResult>> {
        const task = await this.taskRepository.findOneByCondition(
            {
                id: taskId,
            },
            {
                relations: ['subject', 'subject.creator'],
            },
        );
        if (!task || !task.subject || !task.subject.creator || task.subject.creator.id !== user.id) {
            throw new ForbiddenException('Forbidden Resource');
        }
        return {
            data: await this.taskRepository.softDelete(taskId),
        };
    }
}

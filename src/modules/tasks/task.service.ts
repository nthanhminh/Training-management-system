import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BaseServiceAbstract } from "src/services/base/base.abstract.service";
import { Task } from "./entity/task.entity";
import { TaskRepository } from "@repositories/task.repository";
import { CreateTaskDto } from "./dto/createTask.dto";
import { DeepPartial, UpdateResult } from "typeorm";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { SubjectService } from "@modules/subjects/subjects.service";

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
        const {subjectId} = dto;
        const subject = await this.subjectService.findOne(subjectId);
        if(!subject) {
            throw new NotFoundException('tasks.Subject not found');
        }
        return await this.taskRepository.create({
            contentFileLink: dto.contentFileLink,
            subject: subject
        });
    }   

    async deleteTaskBySubjectId(subjectId: string) : Promise<UpdateResult> {
        return await this.taskRepository.softDeleteMany(
            {
                subject: {
                    id: subjectId
                }
            }
        );
    }

    async updateTask(taskId: string, dto: UpdateTaskDto) : Promise<UpdateResult> {
        return await this.taskRepository.update(taskId, dto);
    }
}
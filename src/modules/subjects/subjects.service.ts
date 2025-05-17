import {
    ForbiddenException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Subject } from './entity/subject.entity';
import { SubjectRepository } from '@repositories/subject.repository';
import { CreateSubjectDto, TaskDto } from './dto/createSubject.dto';
import { UsersService } from '@modules/users/user.services';
import { ERolesUser } from '@modules/users/enums/index.enum';
import { TaskService } from '@modules/tasks/task.service';
import { Task } from '@modules/tasks/entity/task.entity';
import { UpdateResult } from 'typeorm';
import { UpdateSubjectDto, UpdateSubjectTask } from './dto/updateSubject.dto';
import { User } from '@modules/users/entity/user.entity';

@Injectable()
export class SubjectService extends BaseServiceAbstract<Subject> {
    constructor(
        @Inject('SUBJECT_REPOSITORY')
        private readonly subjectRepository: SubjectRepository,
        private readonly userService: UsersService,
        @Inject(forwardRef(() => TaskService))
        private readonly taskService: TaskService,
    ) {
        super(subjectRepository);
    }

    async createSubject(dto: CreateSubjectDto, user: User): Promise<Subject> {
        const { name, description, creatorId, tasks } = dto;
        const newSubject = await this.subjectRepository.create({
            name,
            description,
            creator: user,
        });
        const subjectId: string = newSubject.id;
        await this._addTaskForSubject(tasks, subjectId);
        return newSubject;
    }

    async updateSubjectInfo(subjectId: string, dto: UpdateSubjectDto): Promise<UpdateResult> {
        return await this.subjectRepository.update(subjectId, dto);
    }

    async addTaskForSubject(subjectId: string, dto: UpdateSubjectTask): Promise<string> {
        const { tasks } = dto;
        return await this._addTaskForSubject(tasks, subjectId);
    }

    async _addTaskForSubject(tasks: TaskDto[], subjectId: string) {
        if (tasks.length === 0) {
            throw new UnprocessableEntityException('subjects.At least one task is required');
        }
        const tasksData: Promise<Task>[] = tasks.map((task: TaskDto): Promise<Task> => {
            return this.taskService.createTask({
                contentFileLink: task.contentFileLink,
                subjectId: subjectId,
            });
        });
        try {
            const taskObjects: Task[] = await Promise.all(tasksData);
            return 'tasks.Add new task successfully';
        } catch (err) {
            throw new UnprocessableEntityException('tasks.Error happen');
        }
    }

    async deleteSubject(subjectId: string, user: User): Promise<UpdateResult> {
        const subject = await this.subjectRepository.findOneById(subjectId);
        if (!subject) {
            throw new NotFoundException('subjects.Subject not found');
        }
        if (user.id !== subject.creator.id) {
            throw new ForbiddenException('Unauthorized');
        }
        await this.taskService.deleteTaskBySubjectId(subjectId);
        return await this.subjectRepository.softDelete(subjectId);
    }
}

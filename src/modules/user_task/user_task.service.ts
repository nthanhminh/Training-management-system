import { ForbiddenException, forwardRef, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { UserTask } from './entity/user_task.entity';
import { UserTaskRepository } from '@repositories/user_task.repository';
import { UserSubject } from '@modules/user_subject/entity/user_subject.entity';
import { Task } from '@modules/tasks/entity/task.entity';
import { EUserTaskStatus } from './enum/index.enum';
import { AppResponse } from 'src/types/common.type';
import { UpdateResult } from 'typeorm';
import { User } from '@modules/users/entity/user.entity';
import { UserSubjectService } from '@modules/user_subject/user_subject.service';
import { EUserSubjectStatus } from '@modules/user_subject/enum/index.enum';
import { FinishTaskResponseType } from './types/FinishTaskResponse.type';

@Injectable()
export class UserTaskService extends BaseServiceAbstract<UserTask> {
    constructor(
        @Inject('USER_TASK_REPOSITORY')
        private readonly userTaskRepository: UserTaskRepository,
        @Inject(forwardRef(() => UserSubjectService))
        private readonly userSubjectService: UserSubjectService,
    ) {
        super(userTaskRepository);
    }

    async handleCreateUserTask(userSubjects: UserSubject, tasks: Task[]): Promise<UserTask[]> {
        const taskPromise = tasks.map((task) => {
            return this.userTaskRepository.create({
                userSubject: { id: userSubjects.id },
                task: { id: task.id },
            });
        });
        try {
            return Promise.all(taskPromise);
        } catch (error) {
            console.log(error);
            throw new UnprocessableEntityException('course.Error happens when creating subject for trainee');
        }
    }

    async updateStatusForUser(userTaskId: string, user: User): Promise<AppResponse<FinishTaskResponseType>> {
        const userSubjectId = await this._checkUserCanUpdateStatusAndReturnUserSubjecctId(userTaskId, user);
        if (!userSubjectId) {
            throw new ForbiddenException('auths.Forbidden Resource');
        }
        const userTaskUpdated: UpdateResult = await this.userTaskRepository.update(userTaskId, {
            status: EUserTaskStatus.FINISH,
        });
        const numberOfTaskIsNotFinish = await this._countNumberTaskOfSubjectIsNotFinish(userSubjectId);
        if (numberOfTaskIsNotFinish === 0) {
            await this.userSubjectService.update(userSubjectId, {
                status: EUserSubjectStatus.FINISH,
            });
        }
        return {
            data: { ...userTaskUpdated, isSubjectFinish: numberOfTaskIsNotFinish === 0 },
        };
    }

    async _checkUserCanUpdateStatusAndReturnUserSubjecctId(userTaskId: string, user: User): Promise<string | null> {
        const userTask = await this.userTaskRepository.findOneByCondition(
            { id: userTaskId },
            { relations: ['userSubject', 'userSubject.user'] },
        );
        if (
            !userTask ||
            !userTask.userSubject ||
            !userTask.userSubject.user ||
            userTask.userSubject.user.id !== user.id
        ) {
            return null;
        }

        return userTask.userSubject.id;
    }

    async _countNumberTaskOfSubjectIsNotFinish(userSubjectId: string): Promise<number> {
        const userTask = await this.userTaskRepository.findAll({
            userSubject: { id: userSubjectId },
            status: EUserTaskStatus.NOT_FINISH,
        });
        return userTask.items.length;
    }
}

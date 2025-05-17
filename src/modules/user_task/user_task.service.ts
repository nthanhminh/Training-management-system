import { Inject, Injectable } from "@nestjs/common";
import { BaseServiceAbstract } from "src/services/base/base.abstract.service";
import { UserTask } from "./entity/user_task.entity";
import { UserTaskRepository } from "@repositories/user_task.repository";

@Injectable()
export class UserTaskService extends BaseServiceAbstract<UserTask> {
    constructor(
        @Inject('USER_TASK_REPOSITORY')
        private readonly userTaskRepository: UserTaskRepository
    ) {
        super(userTaskRepository);
    }
}
import { UserTask } from "@modules/user_task/entity/user_task.entity";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import { DataSource } from "typeorm";

export class UserTaskRepository extends BaseRepositoryAbstract<UserTask> {
    constructor(dataSource: DataSource) {
        super(UserTask, dataSource);
    }
}
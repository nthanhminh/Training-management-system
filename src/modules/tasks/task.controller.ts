import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { AppResponse } from 'src/types/common.type';
import { TaskService } from './task.service';
import { Task } from './entity/task.entity';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/updateTask.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Post()
    async create(@Body() dto: CreateTaskDto): Promise<AppResponse<Task>> {
        return {
            data: await this.taskService.createTask(dto),
        };
    }

    @Patch(':taskId')
    async update(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.taskService.updateTask(taskId, dto),
        };
    }

    @Delete(':subjectId')
    async deleteBySubjectId(@Param('subjectId') subjectId: string): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.taskService.deleteTaskBySubjectId(subjectId),
        };
    }
}

import { Body, Controller, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { AppResponse } from 'src/types/common.type';
import { TaskService } from './task.service';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ERolesUser } from '@modules/users/enums/index.enum';
import { SessionAuthGuard } from '@modules/auth/guards/session.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { CurrentUserDecorator } from 'src/decorators/current-user.decorator';
import { User } from '@modules/users/entity/user.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Roles(ERolesUser.SUPERVISOR)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Patch(':taskId')
    async update(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto): Promise<AppResponse<UpdateResult>> {
        return await this.taskService.updateTask(taskId, dto);
    }

    @Roles(ERolesUser.SUPERVISOR)
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Delete('id/:taskId')
    async deleteByTaskId(
        @Param('taskId') taskId: string,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<UpdateResult>> {
        return await this.taskService.deleteTaskById(taskId, user);
    }
}

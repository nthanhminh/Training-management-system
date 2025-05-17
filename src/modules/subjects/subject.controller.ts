import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SubjectService } from './subjects.service';
import { CreateSubjectDto } from './dto/createSubject.dto';
import { AppResponse, ResponseMessage } from 'src/types/common.type';
import { Subject } from './entity/subject.entity';
import { UpdateResult } from 'typeorm';
import { UpdateSubjectDto, UpdateSubjectTask } from './dto/updateSubject.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUserDecorator } from 'src/decorators/current-user.decorator';
import { User } from '@modules/users/entity/user.entity';
import { SessionAuthGuard } from '@modules/auth/guards/session.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { ERolesUser } from '@modules/users/enums/index.enum';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Post()
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles(ERolesUser.SUPERVISOR)
    async createNewSubject(
        @Body() dto: CreateSubjectDto,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<Subject>> {
        return {
            data: await this.subjectService.createSubject(dto, user),
        };
    }

    @Patch('info/:id')
    @UseGuards(SessionAuthGuard)
    async updateSubjectInfo(
        @Body() dto: UpdateSubjectDto,
        @Param('id') id: string,
    ): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.subjectService.updateSubjectInfo(id, dto),
        };
    }

    @Patch('task/:id')
    @UseGuards(SessionAuthGuard, RolesGuard)
    async updateSubjectTask(@Body() dto: UpdateSubjectTask, @Param('id') id: string): Promise<ResponseMessage> {
        return {
            message: await this.subjectService.addTaskForSubject(id, dto),
        };
    }

    @Delete(':id')
    @UseGuards(SessionAuthGuard)
    async deleteSubjectById(
        @Param('id') id: string,
        @CurrentUserDecorator() user: User,
    ): Promise<AppResponse<UpdateResult>> {
        return {
            data: await this.subjectService.deleteSubject(id, user),
        };
    }
}

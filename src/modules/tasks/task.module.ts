import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { TaskService } from './task.service';
import { taskProviders } from './task.provider';
import { TaskController } from './task.controller';
import { SubjectModule } from '@modules/subjects/subjects.module';

@Module({
    imports: [DatabaseModule, SharedModule, forwardRef(() => SubjectModule)],
    providers: [...taskProviders, TaskService],
    controllers: [TaskController],
    exports: [TaskService],
})
export class TaskModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { TaskService } from './task.service';
import { taskProviders } from './task.provider';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...taskProviders, TaskService],
  controllers: [],
  exports: [TaskService],
})
export class TaskModule {}

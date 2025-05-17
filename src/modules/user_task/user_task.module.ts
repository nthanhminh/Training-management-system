import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { UserTaskService } from './user_task.service';
import { userTaskProviders } from './user_task.provider';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...userTaskProviders, UserTaskService],
  controllers: [],
  exports: [UserTaskService],
})
export class UserTaskModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { UserCourseService } from './user_course.service';
import { userCourseProviders } from './user_course.provider';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...userCourseProviders, UserCourseService],
  controllers: [],
  exports: [UserCourseService],
})
export class UserCourseModule {}

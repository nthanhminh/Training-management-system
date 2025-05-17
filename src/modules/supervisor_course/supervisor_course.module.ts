import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { SupervisorCourseService } from './supervisor_course.service';
import { supervisorCourseProviders } from './supervisor_course.provider';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...supervisorCourseProviders, SupervisorCourseService],
  controllers: [],
  exports: [SupervisorCourseService],
})
export class SupervisorCourseModule {}

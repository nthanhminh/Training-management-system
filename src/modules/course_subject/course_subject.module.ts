import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { CourseSubjectService } from './course_subject.service';
import { courseSubjectProviders } from './course_subject.provider';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...courseSubjectProviders, CourseSubjectService],
  controllers: [],
  exports: [CourseSubjectService],
})
export class CourseSubjectModule {}

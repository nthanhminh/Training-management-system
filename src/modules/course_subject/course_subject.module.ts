import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { CourseSubjectService } from './course_subject.service';
import { courseSubjectProviders } from './course_subject.provider';
import { CourseModule } from '@modules/courses/course.module';
import { SubjectModule } from '@modules/subjects/subjects.module';

@Module({
  imports: [
    DatabaseModule, 
    SharedModule,
    forwardRef(() => CourseModule),
    SubjectModule
  ],
  providers: [...courseSubjectProviders, CourseSubjectService],
  controllers: [],
  exports: [CourseSubjectService],
})
export class CourseSubjectModule {}

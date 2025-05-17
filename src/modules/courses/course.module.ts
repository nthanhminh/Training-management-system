import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { CourseService } from './course.service';
import { courseProviders } from './cousre.provider';
import { SupervisorCourseModule } from '@modules/supervisor_course/supervisor_course.module';
import { CourseSubjectModule } from '@modules/course_subject/course_subject.module';
import { UserModule } from '@modules/users/user.module';

@Module({
    imports: [DatabaseModule, SharedModule, forwardRef(() => SupervisorCourseModule), CourseSubjectModule, UserModule],
    providers: [...courseProviders, CourseService],
    controllers: [],
    exports: [CourseService],
})
export class CourseModule {}

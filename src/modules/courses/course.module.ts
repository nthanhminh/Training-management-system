import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { CourseService } from './course.service';
import { courseProviders } from './cousre.provider';

@Module({
    imports: [DatabaseModule, SharedModule],
    providers: [...courseProviders, CourseService],
    controllers: [],
    exports: [CourseService],
})
export class CourseModule {}

import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { SubjectService } from './subjects.service';
import { subjectProviders } from './subjects.provider';
import { UserModule } from '@modules/users/user.module';
import { TaskModule } from '@modules/tasks/task.module';
import { SubjectController } from './subject.controller';

@Module({
    imports: [DatabaseModule, SharedModule, UserModule, forwardRef(() => TaskModule)],
    providers: [...subjectProviders, SubjectService],
    controllers: [SubjectController],
    exports: [SubjectService],
})
export class SubjectModule {}

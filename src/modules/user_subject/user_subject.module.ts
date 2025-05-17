import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { UserSubjectService } from './user_subject.service';
import { userSubjectProviders } from './user_subject.provider';

@Module({
    imports: [DatabaseModule, SharedModule],
    providers: [...userSubjectProviders, UserSubjectService],
    controllers: [],
    exports: [UserSubjectService],
})
export class UserSubjectModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/databases/databases.module';
import { SharedModule } from '@modules/shared/shared.module';
import { SubjectService } from './subjects.service';
import { subjectProviders } from './subjects.provider';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...subjectProviders, SubjectService],
  controllers: [],
  exports: [SubjectService],
})
export class SubjectModule {}

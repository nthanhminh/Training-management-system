import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { Subject } from './entity/subject.entity';
import { SubjectRepository } from '@repositories/subject.repository';

@Injectable()
export class SubjectService extends BaseServiceAbstract<Subject> {
    constructor(
        @Inject('SUBJECT_REPOSITORY')
        private readonly subjectRepository: SubjectRepository,
    ) {
        super(subjectRepository);
    }
}

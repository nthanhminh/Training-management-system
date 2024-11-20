import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { UserSubject } from './entity/user_subject.entity';
import { UserSubjectRepository } from '@repositories/user_subject.repository';

@Injectable()
export class UserSubjectService extends BaseServiceAbstract<UserSubject> {
    constructor(
        @Inject('USER_SUBJECT_REPOSITORY')
        private readonly userSubjectRepository: UserSubjectRepository,
    ) {
        super(userSubjectRepository);
    }
}

import { UserSubject } from '@modules/user_subject/entity/user_subject.entity';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { DataSource } from 'typeorm';

export class UserSubjectRepository extends BaseRepositoryAbstract<UserSubject> {
    constructor(dataSource: DataSource) {
        super(UserSubject, dataSource);
    }
}

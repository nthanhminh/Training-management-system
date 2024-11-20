import { Subject } from '@modules/subjects/entity/subject.entity';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { DataSource } from 'typeorm';

export class SubjectRepository extends BaseRepositoryAbstract<Subject> {
    constructor(dataSource: DataSource) {
        super(Subject, dataSource);
    }
}

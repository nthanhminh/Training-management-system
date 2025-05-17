import { DataSource } from 'typeorm';
import { SubjectRepository } from '@repositories/subject.repository';

export const subjectProviders = [
  {
    provide: 'SUBJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => new SubjectRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];

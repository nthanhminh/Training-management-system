import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { Subject } from '@modules/subjects/entity/subject.entity';
import { Course } from '@modules/courses/entity/course.entity';
import { ECourseSubjectStatus } from '../enum/index.enum';
import { UserSubject } from '@modules/user_subject/entity/user_subject.entity';

@Entity()
export class CourseSubject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  courseSubjectId: string;

  @Column({ type: 'enum', enum: ECourseSubjectStatus, default: ECourseSubjectStatus.START })
  status: ECourseSubjectStatus;

  @Column({type: 'varchar'})
  image: string

  @ManyToOne(() => Course, (course) => course.courseSubjects)
  @JoinColumn({name: 'courseId'})
  course: Course

  @ManyToOne(() => Subject, (subject) => subject.courseSubjects)
  @JoinColumn({name: 'subjectId'})
  subject: Subject

  @OneToMany(() => UserSubject, (userSubject) => userSubject.courseSubject)
  userSubjects: UserSubject[]

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

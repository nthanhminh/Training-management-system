import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { User } from '@modules/users/entity/user.entity';
import { CourseSubject } from '@modules/course_subject/entity/course_subject.entity';
import { UserSubject } from '@modules/user_subject/entity/user_subject.entity';
import { Task } from '@modules/tasks/entity/task.entity';
import { EUserTaskStatus } from '../enum/index.enum';

@Entity()
export class UserTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userCourseId: string;

  @Column({ type: 'enum', enum: EUserTaskStatus, default: EUserTaskStatus.NOT_FINISH })
  status: EUserTaskStatus;

  @ManyToOne(() => UserSubject, (userSubject) => userSubject.userTasks)
  @JoinColumn({name: 'userSubjectId'})
  userSubject: CourseSubject

  @ManyToOne(() => Task, (task) => task.userTasks)
  @JoinColumn({name: 'taskId'})
  task: Task

  @Column({ type: 'float' })
  subjectProgress: number

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

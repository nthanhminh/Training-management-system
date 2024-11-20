import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { ECourseStatus } from '../enum/index.enum';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { User } from '@modules/users/entity/user.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @Column({ length: 500 })
  name: string;

  @Column({ type: 'enum', enum: ECourseStatus, default: ECourseStatus.ACTIVE })
  status: ECourseStatus;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.coursesCreated)
  creator: User

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

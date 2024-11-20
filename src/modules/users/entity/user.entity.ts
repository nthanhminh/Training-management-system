import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { ERolesUser } from '../enums/index.enum';
import { Course } from '@modules/courses/entity/course.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column({ type: 'enum', enum: ERolesUser, default: ERolesUser.TRAINEE })
  role: ERolesUser;

  @OneToMany(() => Course, (course) => course.creator)
  coursesCreated: Course[]

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

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
import { User } from '@modules/users/entity/user.entity';
import { Task } from '@modules/tasks/entity/task.entity';
import { CourseSubject } from '@modules/course_subject/entity/course_subject.entity';

@Entity()
export class Subject extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column('text')
    description: string;

    @ManyToOne(() => User, (user) => user.coursesCreated)
    @JoinColumn({ name: 'creatorId' })
    creator: User;

    @OneToMany(() => Task, (task) => task.subject)
    tasksCreated: Task[];

    @OneToMany(() => CourseSubject, (courseSubject) => courseSubject.subject)
    courseSubjects: CourseSubject[];

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}

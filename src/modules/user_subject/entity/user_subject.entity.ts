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
import { CourseSubject } from '@modules/course_subject/entity/course_subject.entity';
import { EUserSubjectStatus } from '../enum/index.enum';
import { UserTask } from '@modules/user_task/entity/user_task.entity';

@Entity()
export class UserSubject extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: EUserSubjectStatus,
        default: EUserSubjectStatus.NOT_FINISH,
    })
    status: EUserSubjectStatus;

    @ManyToOne(() => CourseSubject, (courseSubject) => courseSubject.userSubjects)
    @JoinColumn({ name: 'courseSubjectId' })
    courseSubject: CourseSubject;

    @ManyToOne(() => User, (user) => user.userSubjects)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => UserTask, (userTask) => userTask.userSubject)
    userTasks: UserTask[];

    @Column({ type: 'float' })
    subjectProgress: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}

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
import { UserTask } from '@modules/user_task/entity/user_task.entity';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    contentFileLink: string;

    @ManyToOne(() => Subject, (subject) => subject.tasksCreated)
    @JoinColumn({ name: 'subjectId' })
    subject: Subject;

    @OneToMany(() => UserTask, (userTask) => userTask.task)
    userTasks: UserTask[];

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}

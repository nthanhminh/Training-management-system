import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Unique,
} from 'typeorm';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { Subject } from '@modules/subjects/entity/subject.entity';
import { Course } from '@modules/courses/entity/course.entity';
import { ECourseSubjectStatus } from '../enum/index.enum';
import { UserSubject } from '@modules/user_subject/entity/user_subject.entity';

@Entity()
@Unique(['subjectId', 'courseId'])
export class CourseSubject extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ECourseSubjectStatus,
        default: ECourseSubjectStatus.START,
    })
    status: ECourseSubjectStatus;

    @Column('uuid')
    subjectId: string;

    @Column('uuid')
    courseId: string;

    @ManyToOne(() => Course, (course) => course.courseSubjects)
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @ManyToOne(() => Subject, (subject) => subject.courseSubjects)
    @JoinColumn({ name: 'subjectId' })
    subject: Subject;

    @OneToMany(() => UserSubject, (userSubject) => userSubject.courseSubject)
    userSubjects: UserSubject[];

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}

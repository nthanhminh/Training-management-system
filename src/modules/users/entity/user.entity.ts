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
import { Subject } from '@modules/subjects/entity/subject.entity';
import { UserCourse } from '@modules/user_course/entity/user_course.entity';
import { SupervisorCourse } from '@modules/supervisor_course/entity/supervisor_course.entity';
import { UserSubject } from '@modules/user_subject/entity/user_subject.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column({ type: 'enum', enum: ERolesUser, default: ERolesUser.TRAINEE })
    role: ERolesUser;

    @OneToMany(() => Course, (course) => course.creator)
    coursesCreated: Course[];

    @OneToMany(() => Subject, (subject) => subject.creator)
    subjectsCreated: Subject[];

    @OneToMany(() => UserCourse, (userCourse) => userCourse.user)
    userCourses: UserCourse[];

    @OneToMany(() => SupervisorCourse, (supervisorCourse) => supervisorCourse.user)
    supervisorCourses: SupervisorCourse[];

    @OneToMany(() => UserSubject, (userSubject) => userSubject.user)
    userSubjects: UserSubject[];

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}

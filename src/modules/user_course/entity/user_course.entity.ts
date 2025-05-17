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
import { Course } from '@modules/courses/entity/course.entity';
import { EUserCourseStatus } from '../enum/index.enum';

@Entity()
export class UserCourse extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: EUserCourseStatus,
        default: EUserCourseStatus.RESIGN,
    })
    status: EUserCourseStatus;

    @ManyToOne(() => Course, (course) => course.userCourses)
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @ManyToOne(() => User, (user) => user.userCourses)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: 'float' })
    courseProgress: number;

    @Column({ type: 'date' })
    enrollDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}

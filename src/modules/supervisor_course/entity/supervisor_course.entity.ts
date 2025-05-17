import { Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@modules/shared/base/base.entity';
import { User } from '@modules/users/entity/user.entity';
import { Course } from '@modules/courses/entity/course.entity';

@Entity()
export class SupervisorCourse extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Course, (course) => course.supervisorCourses)
    @JoinColumn({ name: 'courseId' })
    course: Course;

    @ManyToOne(() => User, (user) => user.supervisorCourses)
    @JoinColumn({ name: 'userId' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}

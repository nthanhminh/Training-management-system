import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column({ nullable: true })
    // deletedAt?: Date;
}

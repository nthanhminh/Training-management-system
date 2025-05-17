import { MigrationInterface, QueryRunner } from "typeorm";

export class Version21747877957193 implements MigrationInterface {
    name = 'Version21747877957193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_subject" DROP COLUMN "subjectProgress"`);
        await queryRunner.query(`ALTER TABLE "user_task" DROP COLUMN "subjectProgress"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_task" ADD "subjectProgress" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_subject" ADD "subjectProgress" double precision NOT NULL`);
    }

}

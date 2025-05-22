import { MigrationInterface, QueryRunner } from "typeorm";

export class Version31747888083088 implements MigrationInterface {
    name = 'Version31747888083088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "title" character varying(120) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
    }

}

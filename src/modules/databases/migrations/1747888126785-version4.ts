import { MigrationInterface, QueryRunner } from "typeorm";

export class Version41747888126785 implements MigrationInterface {
    name = 'Version41747888126785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_3399e2710196ea4bf734751558f" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "title" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "title" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_3399e2710196ea4bf734751558f"`);
    }

}

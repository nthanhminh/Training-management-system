import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraint1747981171293 implements MigrationInterface {
    name = 'AddUniqueConstraint1747981171293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_3399e2710196ea4bf734751558f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "title" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_3399e2710196ea4bf734751558f" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "course_subject" DROP CONSTRAINT "FK_1df931b5b9e84dc8a0e77887af9"`);
        await queryRunner.query(`ALTER TABLE "course_subject" DROP CONSTRAINT "FK_4211adbd2dedfd07cf2e2adc3b1"`);
        await queryRunner.query(`ALTER TABLE "course_subject" ALTER COLUMN "subjectId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_subject" ALTER COLUMN "courseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_subject" ADD CONSTRAINT "UQ_6c46350ca1c7b93ac1cdf28adf4" UNIQUE ("subjectId", "courseId")`);
        await queryRunner.query(`ALTER TABLE "course_subject" ADD CONSTRAINT "FK_4211adbd2dedfd07cf2e2adc3b1" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_subject" ADD CONSTRAINT "FK_1df931b5b9e84dc8a0e77887af9" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_subject" DROP CONSTRAINT "FK_1df931b5b9e84dc8a0e77887af9"`);
        await queryRunner.query(`ALTER TABLE "course_subject" DROP CONSTRAINT "FK_4211adbd2dedfd07cf2e2adc3b1"`);
        await queryRunner.query(`ALTER TABLE "course_subject" DROP CONSTRAINT "UQ_6c46350ca1c7b93ac1cdf28adf4"`);
        await queryRunner.query(`ALTER TABLE "course_subject" ALTER COLUMN "courseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_subject" ALTER COLUMN "subjectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_subject" ADD CONSTRAINT "FK_4211adbd2dedfd07cf2e2adc3b1" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_subject" ADD CONSTRAINT "FK_1df931b5b9e84dc8a0e77887af9" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_3399e2710196ea4bf734751558f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "title" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_3399e2710196ea4bf734751558f" UNIQUE ("title")`);
    }

}

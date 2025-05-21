import { MigrationInterface, QueryRunner } from "typeorm";

export class  %npmConfigName%1747810923847 implements MigrationInterface {
    name = ' %npmConfigName%1747810923847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_subject" RENAME COLUMN "taskProgress" TO "subjectProgress"`);
        await queryRunner.query(`ALTER TABLE "user_task" RENAME COLUMN "taskProgress" TO "subjectProgress"`);
        await queryRunner.query(`ALTER TYPE "public"."user_course_status_enum" RENAME TO "user_course_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_course_status_enum" AS ENUM('FAIL', 'PASS', 'RESIGN')`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" TYPE "public"."user_course_status_enum" USING "status"::"text"::"public"."user_course_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" SET DEFAULT 'RESIGN'`);
        await queryRunner.query(`DROP TYPE "public"."user_course_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "image" SET DEFAULT 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "image" SET DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmhsQhiqmHF_i2Cli8YrXow7xhEjVqcTKTjw&s'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "status" SET DEFAULT 'DISABLED'`);
        await queryRunner.query(`CREATE TYPE "public"."user_course_status_enum_old" AS ENUM('FAIL', 'PASS', 'RESIGN', 'IN_PROGRESS')`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" TYPE "public"."user_course_status_enum_old" USING "status"::"text"::"public"."user_course_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" SET DEFAULT 'RESIGN'`);
        await queryRunner.query(`DROP TYPE "public"."user_course_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_course_status_enum_old" RENAME TO "user_course_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_task" RENAME COLUMN "subjectProgress" TO "taskProgress"`);
        await queryRunner.query(`ALTER TABLE "user_subject" RENAME COLUMN "subjectProgress" TO "taskProgress"`);
    }

}

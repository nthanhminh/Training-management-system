import { MigrationInterface, QueryRunner } from "typeorm";

export class Version11747877569509 implements MigrationInterface {
    name = 'Version11747877569509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_task" RENAME COLUMN "taskProgress" TO "subjectProgress"`);
        await queryRunner.query(`ALTER TABLE "user_task" ALTER COLUMN "subjectProgress" DROP DEFAULT`);
        await queryRunner.query(`ALTER TYPE "public"."user_course_status_enum" RENAME TO "user_course_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_course_status_enum" AS ENUM('FAIL', 'PASS', 'RESIGN')`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" TYPE "public"."user_course_status_enum" USING "status"::"text"::"public"."user_course_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" SET DEFAULT 'RESIGN'`);
        await queryRunner.query(`DROP TYPE "public"."user_course_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "image" SET DEFAULT 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg'`);
        await queryRunner.query(`ALTER TABLE "user_subject" ALTER COLUMN "subjectProgress" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_subject" ALTER COLUMN "subjectProgress" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "image" SET DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmhsQhiqmHF_i2Cli8YrXow7xhEjVqcTKTjw&s'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "status" SET DEFAULT 'DISABLED'`);
        await queryRunner.query(`CREATE TYPE "public"."user_course_status_enum_old" AS ENUM('FAIL', 'PASS', 'RESIGN', 'IN_PROGRESS')`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" TYPE "public"."user_course_status_enum_old" USING "status"::"text"::"public"."user_course_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_course" ALTER COLUMN "status" SET DEFAULT 'RESIGN'`);
        await queryRunner.query(`DROP TYPE "public"."user_course_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_course_status_enum_old" RENAME TO "user_course_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_task" ALTER COLUMN "subjectProgress" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_task" RENAME COLUMN "subjectProgress" TO "taskProgress"`);
    }

}

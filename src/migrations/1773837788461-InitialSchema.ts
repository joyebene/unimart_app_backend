import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773837788461 implements MigrationInterface {
    name = 'InitialSchema1773837788461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "lastOtpSentAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "lastOtpSentAt"`);
    }

}

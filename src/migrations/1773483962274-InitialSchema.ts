import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773483962274 implements MigrationInterface {
    name = 'InitialSchema1773483962274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "refreshToken" text`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "avatarUrl" text`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "avatarCloudinaryId"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "avatarCloudinaryId" text`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "location" text`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "otp" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "otp"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "otp" character varying`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "location" character varying`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "bio" character varying`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "avatarCloudinaryId"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "avatarCloudinaryId" character varying`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "refreshToken" character varying`);
    }

}

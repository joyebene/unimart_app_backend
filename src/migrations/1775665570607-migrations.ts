import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1775665570607 implements MigrationInterface {
    name = 'Migrations1775665570607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."products" ADD "isFeaturedProduct" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "unimart"."products" ADD "featuredDuration" integer`);
        await queryRunner.query(`ALTER TABLE "unimart"."products" ADD "featuredExpiresAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "unimart"."payments" DROP COLUMN "proof"`);
        await queryRunner.query(`ALTER TABLE "unimart"."payments" ADD "proof" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."payments" DROP COLUMN "proof"`);
        await queryRunner.query(`ALTER TABLE "unimart"."payments" ADD "proof" jsonb`);
        await queryRunner.query(`ALTER TABLE "unimart"."products" DROP COLUMN "featuredExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "unimart"."products" DROP COLUMN "featuredDuration"`);
        await queryRunner.query(`ALTER TABLE "unimart"."products" DROP COLUMN "isFeaturedProduct"`);
    }

}

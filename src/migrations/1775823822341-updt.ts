import { MigrationInterface, QueryRunner } from "typeorm";

export class Updt1775823822341 implements MigrationInterface {
    name = 'Updt1775823822341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "featuredSellerExpiresAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "featuredSellerExpiresAt"`);
    }

}

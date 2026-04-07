import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsFeaturedUser1775544576928 implements MigrationInterface {
    name = 'AddIsFeaturedUser1775544576928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "isFeaturedSeller" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "isFeaturedSeller"`);
    }

}

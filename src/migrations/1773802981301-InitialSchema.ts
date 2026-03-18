import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773802981301 implements MigrationInterface {
    name = 'InitialSchema1773802981301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" DROP COLUMN "isGroup"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" ADD "isGroup" boolean NOT NULL DEFAULT false`);
    }

}

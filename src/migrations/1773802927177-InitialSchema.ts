import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773802927177 implements MigrationInterface {
    name = 'InitialSchema1773802927177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" ADD "isGroup" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" DROP COLUMN "isGroup"`);
    }

}

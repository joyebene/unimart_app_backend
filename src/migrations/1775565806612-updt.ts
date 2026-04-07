import { MigrationInterface, QueryRunner } from "typeorm";

export class Updt1775565806612 implements MigrationInterface {
    name = 'Updt1775565806612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."payments" ADD "proofCloudinaryId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."payments" DROP COLUMN "proofCloudinaryId"`);
    }

}

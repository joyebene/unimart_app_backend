import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773543772878 implements MigrationInterface {
    name = 'InitialSchema1773543772878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."products" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."products" DROP COLUMN "description"`);
    }

}

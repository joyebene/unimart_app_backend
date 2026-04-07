import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentLogic1775549974677 implements MigrationInterface {
    name = 'AddPaymentLogic1775549974677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."payments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "unimart"."payments" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "unimart"."payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`ALTER TABLE "unimart"."payments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "unimart"."payments" ADD "userId" character varying NOT NULL`);
    }

}

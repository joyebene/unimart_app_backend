import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentLogic1775546655920 implements MigrationInterface {
    name = 'AddPaymentLogic1775546655920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "unimart"."payments_type_enum" AS ENUM('boost', 'featurebadge')`);
        await queryRunner.query(`CREATE TYPE "unimart"."payments_status_enum" AS ENUM('pending', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TABLE "unimart"."payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "productId" character varying, "type" "unimart"."payments_type_enum" NOT NULL, "reference" character varying NOT NULL, "amount" integer NOT NULL, "proof" jsonb, "status" "unimart"."payments_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "unimart"."payments"`);
        await queryRunner.query(`DROP TYPE "unimart"."payments_status_enum"`);
        await queryRunner.query(`DROP TYPE "unimart"."payments_type_enum"`);
    }

}

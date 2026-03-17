import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773744463542 implements MigrationInterface {
    name = 'InitialSchema1773744463542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" RENAME COLUMN "participantLastReadAt" TO "lastRead"`);
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" DROP COLUMN "lastRead"`);
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" ADD "lastRead" jsonb DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" DROP COLUMN "lastRead"`);
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" ADD "lastRead" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" RENAME COLUMN "lastRead" TO "participantLastReadAt"`);
    }

}

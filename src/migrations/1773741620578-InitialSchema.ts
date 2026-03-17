import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773741620578 implements MigrationInterface {
    name = 'InitialSchema1773741620578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" ADD "participantLastReadAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations" DROP COLUMN "participantLastReadAt"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773839390296 implements MigrationInterface {
    name = 'InitialSchema1773839390296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."messages" DROP CONSTRAINT "FK_message_conversation"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "productCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "unimart"."conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."messages" DROP CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "productCount"`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" ADD CONSTRAINT "FK_message_conversation" FOREIGN KEY ("conversationId") REFERENCES "unimart"."conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

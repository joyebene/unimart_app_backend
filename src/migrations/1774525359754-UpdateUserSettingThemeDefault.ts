import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserSettingThemeDefault1774525359754 implements MigrationInterface {
    name = 'UpdateUserSettingThemeDefault1774525359754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."messages" DROP CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19"`);
        await queryRunner.query(`ALTER TABLE "unimart"."user_settings" ALTER COLUMN "theme" SET DEFAULT 'light'`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "unimart"."conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."messages" DROP CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19"`);
        await queryRunner.query(`ALTER TABLE "unimart"."user_settings" ALTER COLUMN "theme" SET DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "unimart"."conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserStatus1774792800066 implements MigrationInterface {
    name = 'AddUserStatus1774792800066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "unimart"."users_status_enum" AS ENUM('active', 'banned')`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD "status" "unimart"."users_status_enum" NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "unimart"."users_status_enum"`);
    }

}

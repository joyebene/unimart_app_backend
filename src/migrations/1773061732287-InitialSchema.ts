import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773061732287 implements MigrationInterface {
    name = 'InitialSchema1773061732287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unimart"."products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "imageUrl" character varying NOT NULL, "imageCloudinaryId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sellerId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."user_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "emailNotifications" boolean NOT NULL DEFAULT true, "pushNotifications" boolean NOT NULL DEFAULT true, "theme" character varying NOT NULL DEFAULT 'system', "userId" uuid, CONSTRAINT "REL_986a2b6d3c05eb4091bb8066f7" UNIQUE ("userId"), CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."support_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying NOT NULL, "message" text NOT NULL, "status" character varying NOT NULL DEFAULT 'open', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2aa37479e71ef29cbf4dba2b1a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reportedId" character varying NOT NULL, "type" character varying NOT NULL, "reason" text NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "reporterId" uuid, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" text NOT NULL, "attachmentUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" uuid, "conversationId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."feedbacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "rating" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "body" text NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."devices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deviceToken" character varying NOT NULL, "platform" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, "avatarUrl" character varying, "avatarCloudinaryId" character varying, "bio" character varying, "location" character varying, "phone" character varying NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "otp" character varying, "otpExpiresAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "settingsId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_76ba283779c8441fd5ff819c8c" UNIQUE ("settingsId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."wishlist_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, CONSTRAINT "PK_0bd52924a97cda208ed2a07bd69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."notification_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "push" boolean NOT NULL DEFAULT true, "pushNewListings" boolean NOT NULL DEFAULT true, "pushPriceDrops" boolean NOT NULL DEFAULT true, "pushMessages" boolean NOT NULL DEFAULT true, "email" boolean NOT NULL DEFAULT true, "emailWishlist" boolean NOT NULL DEFAULT true, "emailPromos" boolean NOT NULL DEFAULT false, "inApp" boolean NOT NULL DEFAULT true, "inAppMessages" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "REL_5a8ffc3b89343043c9440d631e" UNIQUE ("userId"), CONSTRAINT "PK_d131abd7996c475ef768d4559ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unimart"."conversations_participants_users" ("conversationsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_1242f5e8285ef060e51c52e6bdb" PRIMARY KEY ("conversationsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3a97ead02cb5c1e7a15edb5f64" ON "unimart"."conversations_participants_users" ("conversationsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c719245d32a493067b54169eb" ON "unimart"."conversations_participants_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "unimart"."products" ADD CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6" FOREIGN KEY ("sellerId") REFERENCES "unimart"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."user_settings" ADD CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."support_messages" ADD CONSTRAINT "FK_a77fbd88d1a6a253abe1f49d663" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."reports" ADD CONSTRAINT "FK_4353be8309ce86650def2f8572d" FOREIGN KEY ("reporterId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "unimart"."conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."feedbacks" ADD CONSTRAINT "FK_e9b6450d76be18b05b5f09d577b" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."devices" ADD CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" ADD CONSTRAINT "FK_76ba283779c8441fd5ff819c8cf" FOREIGN KEY ("settingsId") REFERENCES "unimart"."user_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."wishlist_items" ADD CONSTRAINT "FK_3167e7490f12ed329a36703d980" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."wishlist_items" ADD CONSTRAINT "FK_485ece8ab9b569d1c560144aa25" FOREIGN KEY ("productId") REFERENCES "unimart"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."notification_settings" ADD CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2" FOREIGN KEY ("userId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unimart"."conversations_participants_users" ADD CONSTRAINT "FK_3a97ead02cb5c1e7a15edb5f646" FOREIGN KEY ("conversationsId") REFERENCES "unimart"."conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "unimart"."conversations_participants_users" ADD CONSTRAINT "FK_0c719245d32a493067b54169ebc" FOREIGN KEY ("usersId") REFERENCES "unimart"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unimart"."conversations_participants_users" DROP CONSTRAINT "FK_0c719245d32a493067b54169ebc"`);
        await queryRunner.query(`ALTER TABLE "unimart"."conversations_participants_users" DROP CONSTRAINT "FK_3a97ead02cb5c1e7a15edb5f646"`);
        await queryRunner.query(`ALTER TABLE "unimart"."notification_settings" DROP CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2"`);
        await queryRunner.query(`ALTER TABLE "unimart"."wishlist_items" DROP CONSTRAINT "FK_485ece8ab9b569d1c560144aa25"`);
        await queryRunner.query(`ALTER TABLE "unimart"."wishlist_items" DROP CONSTRAINT "FK_3167e7490f12ed329a36703d980"`);
        await queryRunner.query(`ALTER TABLE "unimart"."users" DROP CONSTRAINT "FK_76ba283779c8441fd5ff819c8cf"`);
        await queryRunner.query(`ALTER TABLE "unimart"."devices" DROP CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6"`);
        await queryRunner.query(`ALTER TABLE "unimart"."notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "unimart"."feedbacks" DROP CONSTRAINT "FK_e9b6450d76be18b05b5f09d577b"`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" DROP CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19"`);
        await queryRunner.query(`ALTER TABLE "unimart"."messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "unimart"."reports" DROP CONSTRAINT "FK_4353be8309ce86650def2f8572d"`);
        await queryRunner.query(`ALTER TABLE "unimart"."support_messages" DROP CONSTRAINT "FK_a77fbd88d1a6a253abe1f49d663"`);
        await queryRunner.query(`ALTER TABLE "unimart"."user_settings" DROP CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78"`);
        await queryRunner.query(`ALTER TABLE "unimart"."products" DROP CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6"`);
        await queryRunner.query(`DROP INDEX "unimart"."IDX_0c719245d32a493067b54169eb"`);
        await queryRunner.query(`DROP INDEX "unimart"."IDX_3a97ead02cb5c1e7a15edb5f64"`);
        await queryRunner.query(`DROP TABLE "unimart"."conversations_participants_users"`);
        await queryRunner.query(`DROP TABLE "unimart"."notification_settings"`);
        await queryRunner.query(`DROP TABLE "unimart"."wishlist_items"`);
        await queryRunner.query(`DROP TABLE "unimart"."users"`);
        await queryRunner.query(`DROP TABLE "unimart"."devices"`);
        await queryRunner.query(`DROP TABLE "unimart"."notifications"`);
        await queryRunner.query(`DROP TABLE "unimart"."feedbacks"`);
        await queryRunner.query(`DROP TABLE "unimart"."conversations"`);
        await queryRunner.query(`DROP TABLE "unimart"."messages"`);
        await queryRunner.query(`DROP TABLE "unimart"."reports"`);
        await queryRunner.query(`DROP TABLE "unimart"."support_messages"`);
        await queryRunner.query(`DROP TABLE "unimart"."user_settings"`);
        await queryRunner.query(`DROP TABLE "unimart"."products"`);
    }

}

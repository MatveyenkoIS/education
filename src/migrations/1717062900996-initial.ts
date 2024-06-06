import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1717062900996 implements MigrationInterface {
    name = 'Initial1717062900996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "middlename" character varying NOT NULL, "surname" character varying NOT NULL, "maingenre" character varying NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "genre" character varying NOT NULL, "yearofpublication" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shops" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "buildingnumber" integer NOT NULL, CONSTRAINT "UQ_2d52eee86e0f4815cdc79df54ac" UNIQUE ("name"), CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author_book" ("id_1" integer NOT NULL, "id_2" integer NOT NULL, CONSTRAINT "PK_9cb1fbad7d6bebe9ec7962e9418" PRIMARY KEY ("id_1", "id_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b24a733a578fc68786e52d89a2" ON "author_book" ("id_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_291aa17a7b8b863fd5e5d8072c" ON "author_book" ("id_2") `);
        await queryRunner.query(`CREATE TABLE "book_author" ("id_1" integer NOT NULL, "id_2" integer NOT NULL, CONSTRAINT "PK_20b3ed37c6b2da0327b0c952a97" PRIMARY KEY ("id_1", "id_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_49c662e278ea2d72f91323f3d9" ON "book_author" ("id_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e3caef627e70d504c9c60e3f1" ON "book_author" ("id_2") `);
        await queryRunner.query(`CREATE TABLE "book_shop" ("id_1" integer NOT NULL, "id_2" integer NOT NULL, CONSTRAINT "PK_6fd9b5a72754a697717ea0361e4" PRIMARY KEY ("id_1", "id_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2eca86b7ea9d7fb5c25c779ef6" ON "book_shop" ("id_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b3576e907f3f22619c18b869e" ON "book_shop" ("id_2") `);
        await queryRunner.query(`CREATE TABLE "shop_book" ("id_1" integer NOT NULL, "id_2" integer NOT NULL, CONSTRAINT "PK_0d3d08077541119cb3786ac2ae6" PRIMARY KEY ("id_1", "id_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_972f1e3a326f2fc80482cc6c6f" ON "shop_book" ("id_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4fcae81efe7c90a6b121932e1b" ON "shop_book" ("id_2") `);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_b24a733a578fc68786e52d89a22" FOREIGN KEY ("id_1") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_291aa17a7b8b863fd5e5d8072c5" FOREIGN KEY ("id_2") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_49c662e278ea2d72f91323f3d9a" FOREIGN KEY ("id_1") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_4e3caef627e70d504c9c60e3f10" FOREIGN KEY ("id_2") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_shop" ADD CONSTRAINT "FK_2eca86b7ea9d7fb5c25c779ef63" FOREIGN KEY ("id_1") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_shop" ADD CONSTRAINT "FK_2b3576e907f3f22619c18b869ea" FOREIGN KEY ("id_2") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_book" ADD CONSTRAINT "FK_972f1e3a326f2fc80482cc6c6fe" FOREIGN KEY ("id_1") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shop_book" ADD CONSTRAINT "FK_4fcae81efe7c90a6b121932e1b2" FOREIGN KEY ("id_2") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop_book" DROP CONSTRAINT "FK_4fcae81efe7c90a6b121932e1b2"`);
        await queryRunner.query(`ALTER TABLE "shop_book" DROP CONSTRAINT "FK_972f1e3a326f2fc80482cc6c6fe"`);
        await queryRunner.query(`ALTER TABLE "book_shop" DROP CONSTRAINT "FK_2b3576e907f3f22619c18b869ea"`);
        await queryRunner.query(`ALTER TABLE "book_shop" DROP CONSTRAINT "FK_2eca86b7ea9d7fb5c25c779ef63"`);
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_4e3caef627e70d504c9c60e3f10"`);
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_49c662e278ea2d72f91323f3d9a"`);
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_291aa17a7b8b863fd5e5d8072c5"`);
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_b24a733a578fc68786e52d89a22"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fcae81efe7c90a6b121932e1b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_972f1e3a326f2fc80482cc6c6f"`);
        await queryRunner.query(`DROP TABLE "shop_book"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b3576e907f3f22619c18b869e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2eca86b7ea9d7fb5c25c779ef6"`);
        await queryRunner.query(`DROP TABLE "book_shop"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e3caef627e70d504c9c60e3f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49c662e278ea2d72f91323f3d9"`);
        await queryRunner.query(`DROP TABLE "book_author"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_291aa17a7b8b863fd5e5d8072c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b24a733a578fc68786e52d89a2"`);
        await queryRunner.query(`DROP TABLE "author_book"`);
        await queryRunner.query(`DROP TABLE "shops"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "authors"`);
    }

}

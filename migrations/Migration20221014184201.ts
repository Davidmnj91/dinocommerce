import { Migration } from '@mikro-orm/migrations';

export class Migration20221014184201 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" text not null, "description" text not null, "price" int null, "stock" int null, "parent_id" uuid null, constraint "product_pkey" primary key ("id"));');
    this.addSql('create index "product_parent_id_index" on "product" ("parent_id");');

    this.addSql('create table "media" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "product_id" uuid not null, "type" jsonb not null, "name" text not null, "url" text not null, "position" int not null, constraint "media_pkey" primary key ("id"));');

    this.addSql('alter table "media" add constraint "media_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "media" drop constraint "media_product_id_foreign";');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "media" cascade;');
  }

}

import { Migration } from '@mikro-orm/migrations';

export class Migration20221103194447 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product_category" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" text not null, "description" text not null, "parent_id" uuid null, constraint "product_category_pkey" primary key ("id"));');
    this.addSql('create index "product_category_parent_id_index" on "product_category" ("parent_id");');

    this.addSql('create table "product" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" text not null, "description" text not null, "price" int null, "parent_id" uuid null, "category_id_id" uuid null, constraint "product_pkey" primary key ("id"));');
    this.addSql('create index "product_parent_id_index" on "product" ("parent_id");');
    this.addSql('create index "product_category_id_id_index" on "product" ("category_id_id");');

    this.addSql('create table "media" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "product_id" uuid not null, "type" jsonb not null, "name" text not null, "url" text not null, "position" int not null, constraint "media_pkey" primary key ("id"));');

    this.addSql('create table "product_stock" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "product_id_id" uuid not null, "stock" int not null, constraint "product_stock_pkey" primary key ("id"));');
    this.addSql('create index "product_stock_product_id_id_index" on "product_stock" ("product_id_id");');
    this.addSql('alter table "product_stock" add constraint "product_stock_product_id_id_unique" unique ("product_id_id");');

    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "user_id" text not null, "email" text not null, "phone" text not null, "username" text not null, "password" text not null, "role" text not null, "auth_type" text not null, "profile_picture_url" text null, "email_subscription" boolean not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_user_id_index" on "user" ("user_id");');

    this.addSql('alter table "product" add constraint "product_category_id_id_foreign" foreign key ("category_id_id") references "product_category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "media" add constraint "media_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');

    this.addSql('alter table "product_stock" add constraint "product_stock_product_id_id_foreign" foreign key ("product_id_id") references "product" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_category_id_id_foreign";');

    this.addSql('alter table "media" drop constraint "media_product_id_foreign";');

    this.addSql('alter table "product_stock" drop constraint "product_stock_product_id_id_foreign";');

    this.addSql('drop table if exists "product_category" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "media" cascade;');

    this.addSql('drop table if exists "product_stock" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}

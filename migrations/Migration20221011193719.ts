import { Migration } from '@mikro-orm/migrations';

export class Migration20221011193719 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product_category" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" text not null, "description" text not null, "parent_id" uuid null, constraint "product_category_pkey" primary key ("id"));');
    this.addSql('create index "product_category_parent_id_index" on "product_category" ("parent_id");');

    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "user_id" text not null, "email" text not null, "phone" text not null, "username" text not null, "password" text not null, "role" text not null, "auth_type" text not null, "profile_picture_url" text null, "email_subscription" boolean not null, constraint "user_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product_category" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}

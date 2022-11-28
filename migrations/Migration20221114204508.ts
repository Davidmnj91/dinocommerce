import { Migration } from '@mikro-orm/migrations';

export class Migration20221114204508 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "group" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" text not null, constraint "group_pkey" primary key ("id"));');
    this.addSql('alter table "group" add constraint "group_name_unique" unique ("name");');

    this.addSql('create table "operator" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "operator_id" text not null, "name" text not null, "last_name" text not null, "date_of_birth" timestamptz(0) not null, "email" text not null, "phone" text not null, "username" text not null, "password" text not null, "auth_type" text not null, "profile_picture_url" text null, "last_login" timestamptz(0) not null, "is_super_user" boolean not null, constraint "operator_pkey" primary key ("id"));');
    this.addSql('create index "operator_operator_id_index" on "operator" ("operator_id");');
    this.addSql('alter table "operator" add constraint "operator_operator_id_unique" unique ("operator_id");');
    this.addSql('alter table "operator" add constraint "operator_email_unique" unique ("email");');
    this.addSql('alter table "operator" add constraint "operator_phone_unique" unique ("phone");');

    this.addSql('create table "operator_groups" ("operator_id" uuid not null, "group_id" uuid not null, constraint "operator_groups_pkey" primary key ("operator_id", "group_id"));');

    this.addSql('create table "permission" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "module" varchar(255) not null, "actions" text[] not null, "group_id" uuid not null, constraint "permission_pkey" primary key ("id"));');
    this.addSql('alter table "permission" add constraint "permission_group_id_module_unique" unique ("group_id", "module");');

    this.addSql('alter table "operator_groups" add constraint "operator_groups_operator_id_foreign" foreign key ("operator_id") references "operator" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "operator_groups" add constraint "operator_groups_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "permission" add constraint "permission_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');

    this.addSql('alter table "user_address" drop constraint "user_address_user_id_foreign";');

    this.addSql('drop index "user_address_user_id_index";');
    this.addSql('alter table "user_address" rename column "user_id" to "user_id_id";');
    this.addSql('alter table "user_address" add constraint "user_address_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;');
    this.addSql('create index "user_address_user_id_id_index" on "user_address" ("user_id_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "operator_groups" drop constraint "operator_groups_group_id_foreign";');

    this.addSql('alter table "permission" drop constraint "permission_group_id_foreign";');

    this.addSql('alter table "operator_groups" drop constraint "operator_groups_operator_id_foreign";');

    this.addSql('drop table if exists "group" cascade;');

    this.addSql('drop table if exists "operator" cascade;');

    this.addSql('drop table if exists "operator_groups" cascade;');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('alter table "user_address" drop constraint "user_address_user_id_id_foreign";');

    this.addSql('drop index "user_address_user_id_id_index";');
    this.addSql('alter table "user_address" rename column "user_id_id" to "user_id";');
    this.addSql('alter table "user_address" add constraint "user_address_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete no action;');
    this.addSql('create index "user_address_user_id_index" on "user_address" ("user_id");');
  }

}

import { Migration } from '@mikro-orm/migrations';

export class Migration20221127190031 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "group" alter column "name" type varchar(255) using ("name"::varchar(255));');

    this.addSql('alter table "operator" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "operator" alter column "last_name" type varchar(255) using ("last_name"::varchar(255));');
    this.addSql('alter table "operator" alter column "email" type varchar(255) using ("email"::varchar(255));');
    this.addSql('alter table "operator" alter column "phone" type varchar(255) using ("phone"::varchar(255));');
    this.addSql('alter table "operator" alter column "password" type varchar(255) using ("password"::varchar(255));');
    this.addSql('alter table "operator" alter column "profile_picture_url" type varchar(255) using ("profile_picture_url"::varchar(255));');
    this.addSql('alter table "operator" alter column "last_login" type timestamptz(0) using ("last_login"::timestamptz(0));');
    this.addSql('alter table "operator" alter column "last_login" drop not null;');
    this.addSql('drop index "operator_operator_id_index";');
    this.addSql('alter table "operator" drop constraint "operator_operator_id_unique";');
    this.addSql('alter table "operator" drop column "operator_id";');
    this.addSql('alter table "operator" drop column "username";');
    this.addSql('alter table "operator" drop column "auth_type";');

    this.addSql('alter table "product_category" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "product_category" alter column "description" type varchar(255) using ("description"::varchar(255));');

    this.addSql('alter table "product" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "product" alter column "description" type varchar(255) using ("description"::varchar(255));');

    this.addSql('alter table "media" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "media" alter column "url" type varchar(255) using ("url"::varchar(255));');

    this.addSql('alter table "user" alter column "user_id" type varchar(255) using ("user_id"::varchar(255));');
    this.addSql('alter table "user" alter column "email" type varchar(255) using ("email"::varchar(255));');
    this.addSql('alter table "user" alter column "phone" type varchar(255) using ("phone"::varchar(255));');
    this.addSql('alter table "user" alter column "username" type varchar(255) using ("username"::varchar(255));');
    this.addSql('alter table "user" alter column "password" type varchar(255) using ("password"::varchar(255));');
    this.addSql('alter table "user" alter column "profile_picture_url" type varchar(255) using ("profile_picture_url"::varchar(255));');

    this.addSql('alter table "user_address" alter column "address_line" type varchar(255) using ("address_line"::varchar(255));');
    this.addSql('alter table "user_address" alter column "city" type varchar(255) using ("city"::varchar(255));');
    this.addSql('alter table "user_address" alter column "province" type varchar(255) using ("province"::varchar(255));');
    this.addSql('alter table "user_address" alter column "zip_code" type varchar(255) using ("zip_code"::varchar(255));');
    this.addSql('alter table "user_address" alter column "country" type varchar(255) using ("country"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "group" alter column "name" type text using ("name"::text);');

    this.addSql('alter table "operator" add column "operator_id" text not null, add column "username" text not null, add column "auth_type" text not null;');
    this.addSql('alter table "operator" alter column "name" type text using ("name"::text);');
    this.addSql('alter table "operator" alter column "last_name" type text using ("last_name"::text);');
    this.addSql('alter table "operator" alter column "email" type text using ("email"::text);');
    this.addSql('alter table "operator" alter column "phone" type text using ("phone"::text);');
    this.addSql('alter table "operator" alter column "password" type text using ("password"::text);');
    this.addSql('alter table "operator" alter column "profile_picture_url" type text using ("profile_picture_url"::text);');
    this.addSql('alter table "operator" alter column "last_login" type timestamptz(0) using ("last_login"::timestamptz(0));');
    this.addSql('alter table "operator" alter column "last_login" set not null;');
    this.addSql('create index "operator_operator_id_index" on "operator" ("operator_id");');
    this.addSql('alter table "operator" add constraint "operator_operator_id_unique" unique ("operator_id");');

    this.addSql('alter table "product_category" alter column "name" type text using ("name"::text);');
    this.addSql('alter table "product_category" alter column "description" type text using ("description"::text);');

    this.addSql('alter table "product" alter column "name" type text using ("name"::text);');
    this.addSql('alter table "product" alter column "description" type text using ("description"::text);');

    this.addSql('alter table "media" alter column "name" type text using ("name"::text);');
    this.addSql('alter table "media" alter column "url" type text using ("url"::text);');

    this.addSql('alter table "user" alter column "user_id" type text using ("user_id"::text);');
    this.addSql('alter table "user" alter column "email" type text using ("email"::text);');
    this.addSql('alter table "user" alter column "phone" type text using ("phone"::text);');
    this.addSql('alter table "user" alter column "username" type text using ("username"::text);');
    this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
    this.addSql('alter table "user" alter column "profile_picture_url" type text using ("profile_picture_url"::text);');

    this.addSql('alter table "user_address" alter column "address_line" type text using ("address_line"::text);');
    this.addSql('alter table "user_address" alter column "city" type text using ("city"::text);');
    this.addSql('alter table "user_address" alter column "province" type text using ("province"::text);');
    this.addSql('alter table "user_address" alter column "zip_code" type text using ("zip_code"::text);');
    this.addSql('alter table "user_address" alter column "country" type text using ("country"::text);');
  }

}

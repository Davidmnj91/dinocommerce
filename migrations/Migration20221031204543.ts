import { Migration } from '@mikro-orm/migrations';

export class Migration20221031204543 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "category_id_id" uuid null;');
    this.addSql('alter table "product" add constraint "product_category_id_id_foreign" foreign key ("category_id_id") references "product_category" ("id") on update cascade on delete set null;');
    this.addSql('create index "product_category_id_id_index" on "product" ("category_id_id");');

    this.addSql('create index "user_user_id_index" on "user" ("user_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_category_id_id_foreign";');

    this.addSql('drop index "product_category_id_id_index";');
    this.addSql('alter table "product" drop column "category_id_id";');

    this.addSql('drop index "user_user_id_index";');
  }

}

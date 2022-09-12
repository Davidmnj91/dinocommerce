import { AfterLoad, BaseEntity, CreateDateColumn, DeleteDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  __entity?: string;

  @ObjectIdColumn()
  _id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }
}

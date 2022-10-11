import { Options } from '@mikro-orm/core';
import { ProductCategory } from '../inventory/domain/product-category';
import { User } from '../user/domain/user.entity';

export default {
  entities: [User, ProductCategory],
  type: 'postgresql' as const,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  debug: true,
} as Options;

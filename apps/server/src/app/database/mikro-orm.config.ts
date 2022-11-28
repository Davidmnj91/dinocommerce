import {
  Group,
  Operator,
  Permission,
  User,
  UserAddress,
} from '@dinocommerce/auth';
import {
  Media,
  Product,
  ProductCategory,
  ProductStock,
} from '@dinocommerce/warehouse';
import { Options } from '@mikro-orm/core';

export default {
  entities: [User, UserAddress, ProductCategory, Product, ProductStock, Media, Operator, Group, Permission],
  type: 'postgresql' as const,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  debug: true,
} as Options;

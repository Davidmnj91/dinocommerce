import { Options } from '@mikro-orm/core';

import { Media } from '../inventory/domain/media';
import { Product } from '../inventory/domain/product';
import { ProductCategory } from '../inventory/domain/product-category';
import { ProductStock } from '../inventory/domain/product-stock';
import { UserAddress } from '../user/domain/user-adress.entity';
import { User } from '../user/domain/user.entity';

export default {
  entities: [User, UserAddress, ProductCategory, Product, ProductStock, Media],
  type: 'postgresql' as const,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  debug: true,
} as Options;

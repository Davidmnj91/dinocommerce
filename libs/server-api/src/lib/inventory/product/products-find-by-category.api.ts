import { ProductCategoryModel } from '../product-category';
import { ProductModel } from './product-model';

export type ProductsFindByCategoryApi = {
  findProductsByCategory: (query: FindProductsByCategoryRequest) => Promise<FindProductsByCategoryResponse>;
};

export type FindProductsByCategoryRequest = ProductCategoryModel['id'];

export type FindProductsByCategoryResponse = ProductModel[];

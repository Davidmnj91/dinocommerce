import { ProductCategoryModel } from './product-category.model';

export type ProductCategoryFindApi = {
  findProductCategory: (query: FindProductCategoryRequest) => Promise<FindProductCategoryResponse>;
};

export type FindProductCategoryRequest = ProductCategoryModel['id'];

export type FindProductCategoryResponse = ProductCategoryModel;

import { ProductCategoryModel } from './product-category.model';

export type ProductCategoryCreateApi = {
  createProductCategory: (body: CreateProductCategoryRequest) => Promise<CreateProductCategoryResponse>;
};

export type CreateProductCategoryRequest = {
  name: string;
  description: string;
  parentId?: string;
};
export type CreateProductCategoryResponse = ProductCategoryModel['id'];

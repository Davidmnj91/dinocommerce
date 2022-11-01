import { ProductCategoryModel } from './product-category.model';

export type ProductCategoriesUpdateApi = {
  updateProductCategory: (
    id: ProductCategoryModel['id'],
    body: UpdateProductCategoryRequest
  ) => Promise<UpdateProductCategoryResponse>;
};

export type UpdateProductCategoryRequest = {
  name?: string;
  description?: string;
  parentId?: string;
};
export type UpdateProductCategoryResponse = ProductCategoryModel['id'];

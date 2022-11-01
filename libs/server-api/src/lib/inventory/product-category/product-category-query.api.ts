import { QueryExpression } from '../../queryable';
import { FindProductCategoryResponse } from './product-category-find.api';
import { ProductCategoryModel } from './product-category.model';

export type ProductCategoriesQueryApi = {
  queryProductCategories: (query: QueryProductCategoriesRequest) => Promise<QueryProductCategoryResponse>;
};

export type QueryProductCategoriesRequest = QueryExpression<ProductCategoryModel>;

export type QueryProductCategoryResponse = FindProductCategoryResponse[];

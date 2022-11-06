import { QueryExpression } from '../../queryable';
import { FindProductResponse } from './product-find.api';
import { ProductModel } from './product.model';

export type ProductsQueryApi = {
  queryProducts: (query: QueryProductsRequest) => Promise<QueryProductResponse>;
};

export type QueryProductsRequest = QueryExpression<ProductModel>;

export type QueryProductResponse = FindProductResponse[];

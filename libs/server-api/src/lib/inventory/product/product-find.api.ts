import { ProductModel } from './product-model';

export type ProductFindApi = {
  findProduct: (query: FindProductRequest) => Promise<FindProductResponse>;
};

export type FindProductRequest = ProductModel['id'];

export type FindProductResponse = ProductModel;

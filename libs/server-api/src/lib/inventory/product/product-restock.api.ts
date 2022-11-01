import { ProductModel } from './product-model';

export type ProductRestockApi = {
  restockProduct: (id: ProductModel['id'], body: RestockProductRequest) => Promise<RestockProductResponse>;
};

export type RestockProductRequest = {
  stock: number;
};
export type RestockProductResponse = ProductModel['id'];

import { ProductModel } from './product-model';

export type ProductCreateApi = {
  createProduct: (body: CreateProductRequest) => Promise<CreateProductResponse>;
};

export type CreateProductRequest = {
  name: string;
  description: string;
  price?: number;
  stock?: number;
  parentId?: string;
  categoryId?: string;
};
export type CreateProductResponse = ProductModel['id'];

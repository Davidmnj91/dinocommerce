import {
  MediaType,
  ProductModel,
} from './product-model';

export type ProductUpdateApi = {
  updateProduct: (id: ProductModel['id'], body: UpdateProductRequest) => Promise<UpdateProductResponse>;
};

export type UpdateProductRequest = {
  name?: string;
  description?: string;
  price?: number;
  media?: Array<{
    name: string;
    type: MediaType;
    url: string;
    position: number;
  }>;
  parentId?: string;
  categoryId?: string;
};
export type UpdateProductResponse = ProductModel['id'];

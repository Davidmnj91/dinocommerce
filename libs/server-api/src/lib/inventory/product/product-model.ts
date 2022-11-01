export type ProductModel = {
  id: string;
  name: string;
  description: string;
  price?: number;
  stock?: number;
  media?: MediaModel[];
  parentId?: string;
  categoryId?: string;
};

export type MediaType = 'IMAGE' | 'VIDEO' | '3D';

export type MediaModel = {
  id: string;
  type: MediaType;
  name: string;
  url: string;
  position: number;
};

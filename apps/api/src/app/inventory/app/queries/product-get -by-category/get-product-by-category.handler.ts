import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '../../../domain/product.service';
import { MediaQueryModel } from '../common/media.query.model';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductByCategoryQuery } from './get-product-by-category.query';

@QueryHandler(GetProductByCategoryQuery)
export class GetProductByCategoryQueryQueryHandler implements IInferredQueryHandler<GetProductByCategoryQuery> {
  constructor(private domainService: ProductDomainService) {}

  async execute(query: GetProductByCategoryQuery): Promise<ProductQueryModel[]> {
    const { productCategoryId } = query;
    const products = await this.domainService.findProductsByProductCategoryId(productCategoryId);

    return products.map(
      (product) =>
        new ProductQueryModel(
          product.name,
          product.description,
          product.price,
          product.stock,
          product.media.getItems().map((m) => new MediaQueryModel(m.type, m.name, m.url, m.position)),
          product.parentId,
          product.categoryId
        )
    );
  }
}

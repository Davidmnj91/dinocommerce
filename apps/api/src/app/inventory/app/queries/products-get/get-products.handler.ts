import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '../../../domain/product.service';
import { MediaQueryModel } from '../common/media.query.model';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductsQuery } from './get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler implements IInferredQueryHandler<GetProductsQuery> {
  constructor(private domainService: ProductDomainService) {}

  async execute(query: GetProductsQuery): Promise<ProductQueryModel[]> {
    const products = await this.domainService.findProducts();

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

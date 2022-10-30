import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductDomainService } from '../../../domain/product.service';
import { MediaQueryModel } from '../common/media.query.model';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductQuery } from './get-product.query';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IInferredQueryHandler<GetProductQuery> {
  constructor(private domainService: ProductDomainService) {}

  async execute(query: GetProductQuery): Promise<ProductQueryModel> {
    const { id } = query;
    const product = await this.domainService.findProductById(id);

    return new ProductQueryModel(
      product.name,
      product.description,
      product.price,
      product.stock,
      product.media.getItems().map((m) => new MediaQueryModel(m.type, m.name, m.url, m.position)),
      product.parentId,
      product.categoryId
    );
  }
}

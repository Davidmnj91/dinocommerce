import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ProductDomainService } from '../../../domain/product.service';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductsQuery } from './get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler implements IInferredQueryHandler<GetProductsQuery> {
  constructor(private domainService: ProductDomainService) {}

  async execute(query: GetProductsQuery): Promise<ProductQueryModel[]> {
    const products = await this.domainService.findProducts(query.query);

    return plainToInstance(ProductQueryModel, products, { excludeExtraneousValues: true });
  }
}

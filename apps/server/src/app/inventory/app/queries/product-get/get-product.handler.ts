import { plainToInstance } from 'class-transformer';

import {
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { ProductStockDomainService } from '../../../domain/product-stock.service';
import { ProductDomainService } from '../../../domain/product.service';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductQuery } from './get-product.query';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IInferredQueryHandler<GetProductQuery> {
  constructor(
    private domainService: ProductDomainService,
    private productStockDomainService: ProductStockDomainService
  ) {}

  async execute(query: GetProductQuery): Promise<ProductQueryModel> {
    const { id } = query;
    const product = await this.domainService.findProductById(id);
    const { stock } = await this.productStockDomainService.findStockByProductId(id);

    return plainToInstance(ProductQueryModel, { ...product, stock }, { excludeExtraneousValues: true });
  }
}

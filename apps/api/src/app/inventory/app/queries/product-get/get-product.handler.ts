import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ProductDomainService } from '../../../domain/product.service';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductQuery } from './get-product.query';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IInferredQueryHandler<GetProductQuery> {
  constructor(private domainService: ProductDomainService) {}

  async execute(query: GetProductQuery): Promise<ProductQueryModel> {
    const { id } = query;
    const product = await this.domainService.findProductById(id);

    return plainToInstance(ProductQueryModel, product, { excludeExtraneousValues: true });
  }
}

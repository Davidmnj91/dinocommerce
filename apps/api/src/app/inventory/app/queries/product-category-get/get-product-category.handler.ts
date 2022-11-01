import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { ProductCategoryQueryModel } from '../common/prodcut-category.query-model';
import { GetProductCategoryQuery } from './get-product-category.query';

@QueryHandler(GetProductCategoryQuery)
export class GetProductCategoryQueryHandler implements IInferredQueryHandler<GetProductCategoryQuery> {
  constructor(private domainService: ProductCategoryDomainService) {}

  async execute(query: GetProductCategoryQuery): Promise<ProductCategoryQueryModel> {
    const { id } = query;
    const category = await this.domainService.findProductCategoryById(id);

    return plainToInstance(ProductCategoryQueryModel, category, { excludeExtraneousValues: true });
  }
}

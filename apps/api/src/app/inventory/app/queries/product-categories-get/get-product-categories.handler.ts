import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { ProductCategoryQueryModel } from '../common/prodcut-category.query-model';
import { GetProductCategoriesQuery } from './get-product-categories.query';

@QueryHandler(GetProductCategoriesQuery)
export class GetProductCategoriesQueryHandler implements IInferredQueryHandler<GetProductCategoriesQuery> {
  constructor(private domainService: ProductCategoryDomainService) {}

  async execute(query: GetProductCategoriesQuery): Promise<ProductCategoryQueryModel[]> {
    const categories = await this.domainService.findProductCategories(query.query);

    const queryModel = plainToInstance(ProductCategoryQueryModel, categories);

    return queryModel;
  }
}

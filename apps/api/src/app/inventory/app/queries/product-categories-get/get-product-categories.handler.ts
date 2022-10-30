import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { traverse } from '../../../../shared/utils/traverse';
import { ProductCategoryDomainService } from '../../../domain/product-category.service';
import { ProductCategoriesListDto } from '../common/product-categories-list.query-model';
import { GetProductCategoriesQuery } from './get-product-categories.query';

@QueryHandler(GetProductCategoriesQuery)
export class GetProductCategoriesQueryHandler implements IInferredQueryHandler<GetProductCategoriesQuery> {
  constructor(private domainService: ProductCategoryDomainService) {}

  async execute(query: GetProductCategoriesQuery): Promise<ProductCategoriesListDto> {
    const categories = await this.domainService.findProductCategories();

    const categoriesWithChildren = traverse(categories);

    return new ProductCategoriesListDto(categoriesWithChildren);
  }
}

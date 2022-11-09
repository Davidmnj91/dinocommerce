import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ProductDomainService } from '../../../domain/product.service';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductByCategoryQuery } from './get-product-by-category.query';

@QueryHandler(GetProductByCategoryQuery)
export class GetProductByCategoryQueryQueryHandler implements IInferredQueryHandler<GetProductByCategoryQuery> {
  constructor(private domainService: ProductDomainService) {}

  async execute(query: GetProductByCategoryQuery): Promise<ProductQueryModel[]> {
    const { productCategoryId } = query;
    const products = await this.domainService.findProductsByProductCategoryId(productCategoryId);

    return plainToInstance(ProductQueryModel, products, { excludeExtraneousValues: true });
  }
}

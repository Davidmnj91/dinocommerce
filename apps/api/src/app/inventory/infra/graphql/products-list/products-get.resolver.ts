import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { PassportAuthGuard } from '../../../../shared/auth';
import { GetProductsQuery } from '../../../app/queries/products-get/get-products.query';
import { ProductViewModel } from '../common/models/product.view-model';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/products')
export class GetProductsResolver {
  constructor(private queryBus: QueryBus) {}

  @Query((_returns) => ProductViewModel)
  async getProducts(): Promise<ProductViewModel[]> {
    const queryModel = await this.queryBus.execute(new GetProductsQuery());
    return plainToInstance(ProductViewModel, queryModel);
  }
}

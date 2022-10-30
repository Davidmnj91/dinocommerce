import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { PassportAuthGuard } from '../../../../shared/auth';
import { GetProductQuery } from '../../../app/queries/product-get/get-product.query';
import { ProductViewModel } from '../common/models/product.view-model';

@UseGuards(PassportAuthGuard)
@Resolver('inventory/products')
export class GetProductResolver {
  constructor(private queryBus: QueryBus) {}

  @Query((_returns) => ProductViewModel)
  async getProduct(@Args('id') productId: string): Promise<ProductViewModel> {
    const queryModel = await this.queryBus.execute(new GetProductQuery(productId));
    return plainToClass(ProductViewModel, queryModel);
  }
}

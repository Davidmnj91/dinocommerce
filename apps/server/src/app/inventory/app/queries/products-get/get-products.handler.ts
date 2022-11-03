import { plainToInstance } from 'class-transformer';

import {
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { ProductStockDomainService } from '../../../domain/product-stock.service';
import { ProductDomainService } from '../../../domain/product.service';
import { ProductQueryModel } from '../common/product.query.model';
import { GetProductsQuery } from './get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler implements IInferredQueryHandler<GetProductsQuery> {
  constructor(
    private domainService: ProductDomainService,
    private productStockDomainService: ProductStockDomainService
  ) {}

  async execute(query: GetProductsQuery): Promise<ProductQueryModel[]> {
    const products = await this.domainService.findProducts(query.query);
    const productsById = products.reduce((acc, product) => ({ ...acc, [product.id]: product }), {});

    const stocks = await this.productStockDomainService.findStocksForProducts(Object.keys(productsById));
    const stocksByProductsId = stocks.reduce((acc, stock) => ({ ...acc, [stock.productId.id]: stock.stock }), {});

    const productsWithStock = Object.keys(productsById).reduce(
      (acc, id) => [...acc, { ...productsById[id], ...{ stock: stocksByProductsId[id] } }],
      []
    );

    return plainToInstance(ProductQueryModel, productsWithStock, { excludeExtraneousValues: true });
  }
}

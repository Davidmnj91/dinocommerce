import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWT_STRATEGY } from "../../../../../shared/auth/auth.strategies";
import { GetProductCategoriesQuery } from "../../../../app/queries/get-product-categories/get-product-categories.query";
import { ProductCategoriesListDto } from "../../../../app/queries/get-product-categories/product-categories-list.query-model";

@ApiBearerAuth()
@ApiCookieAuth()
@UseGuards(AuthGuard(JWT_STRATEGY))
@ApiTags('Inventory')
@Controller('inventory/categories')
export class GetProductCategoriesController {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'List existing Product category' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProductCategories(): Promise<ProductCategoriesListDto> {
    return await this.queryBus.execute(new GetProductCategoriesQuery());
  }
}

import { Query } from "../../../../shared/cqrs";
import { ProductCategoriesListDto } from "./product-categories-list.query-model";

export class GetProductCategoriesQuery extends Query<ProductCategoriesListDto> {

}
import { IInferredQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { traverse } from "../../../../shared/utils/traverse";
import { ProductCategoryDomainService } from "../../../domain/product-category.service";
import { GetProductCategoriesQuery } from "./get-product-categories.query";
import { ProductCategoriesListDto } from "./product-categories-list.query-model";

@QueryHandler(GetProductCategoriesQuery)
export class GetProductCategoriesQueryHanlder implements IInferredQueryHandler<GetProductCategoriesQuery> {
    
    constructor(private domainService: ProductCategoryDomainService){}

    async execute(): Promise<ProductCategoriesListDto> {
         const categories = await this.domainService.findProdcutCategories()

        const categoriesWithChildren = traverse(categories);

         return new ProductCategoriesListDto(categoriesWithChildren)
    }

    

}
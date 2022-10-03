import { ObjectId } from "@mikro-orm/mongodb";

export class ProductCategoryQueryModel {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly parentId: ObjectId;
    readonly children?: ProductCategoryQueryModel[];
}
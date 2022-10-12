import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductCategoryViewModel {
  @Field()
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field()
  readonly parentId: string;
  @Field(() => [ProductCategoryViewModel], { nullable: true })
  readonly children?: ProductCategoryViewModel[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import { MediaViewModel } from './media.view-model';

@ObjectType()
export class ProductViewModel {
  @Field()
  readonly id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field()
  readonly price?: number;
  @Field()
  readonly stock?: number;
  @Field(() => [MediaViewModel], { nullable: true })
  readonly media?: MediaViewModel[];
  @Field()
  readonly parentId: string;
  @Field(() => [ProductViewModel], { nullable: true })
  readonly children?: ProductViewModel[];
}

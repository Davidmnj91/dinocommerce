import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MediaViewModel {
  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  position: number;
}

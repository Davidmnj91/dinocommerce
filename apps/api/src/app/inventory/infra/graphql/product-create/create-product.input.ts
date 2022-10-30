import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field({ description: 'test Category' })
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  price: number;

  @Field()
  stock: number;

  @Field()
  parentId: string;

  @Field()
  categoryId: string;
}

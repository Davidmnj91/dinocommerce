import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RestockProductInput {
  @Field()
  @IsNotEmpty()
  stock: number;

  constructor(stock: number) {
    this.stock = stock;
  }
}

import { IsNotEmpty } from 'class-validator';

import {
  OwnQueryProps,
  Query,
} from '@dinocommerce/shared';

import { OperatorDetailsQueryModel } from './operator-detail.query-model';

export class GetOperatorDetailsQuery extends Query<OperatorDetailsQueryModel> {
  @IsNotEmpty()
  readonly email: string;

  constructor({ email }: OwnQueryProps<GetOperatorDetailsQuery>) {
    super();
    this.email = email;
  }
}

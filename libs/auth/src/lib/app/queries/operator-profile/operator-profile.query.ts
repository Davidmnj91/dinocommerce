import { IsEmail } from 'class-validator';

import {
  OwnQueryProps,
  Query,
} from '@dinocommerce/shared';

import { OperatorProfileQueryModel } from './operator-profile.query-model';

export class OperatorProfileQuery extends Query<OperatorProfileQueryModel> {
  @IsEmail()
  readonly operatorId: string;

  constructor({ operatorId }: OwnQueryProps<OperatorProfileQuery>) {
    super();
    this.operatorId = operatorId;
  }
}

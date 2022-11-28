import { IsEmail } from 'class-validator';

import {
  OwnQueryProps,
  Query,
} from '@dinocommerce/shared';

import { UserDetailsQueryModel } from './user-details.query-model';

export class UserDetailsQuery extends Query<UserDetailsQueryModel> {
  @IsEmail()
  readonly userIdOrEmail: string;

  constructor({ userIdOrEmail }: OwnQueryProps<UserDetailsQuery>) {
    super();
    this.userIdOrEmail = userIdOrEmail;
  }
}

import { IsEmail } from 'class-validator';

import { OwnQueryProps, Query } from '../../../../shared/cqrs';
import { UserDetailsQueryModel } from './user-details.query-model';

export class UserDetailsQuery extends Query<UserDetailsQueryModel> {
  @IsEmail()
  readonly userIdOrEmail: string;

  constructor({ userIdOrEmail }: OwnQueryProps<UserDetailsQuery>) {
    super();
    this.userIdOrEmail = userIdOrEmail;
  }
}

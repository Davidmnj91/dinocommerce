import { IsEmail } from 'class-validator';

import {
  OwnQueryProps,
  Query,
} from '@dinocommerce/shared';

import { UserProfileQueryModel } from './user-profile.query-model';

export class UserProfileQuery extends Query<UserProfileQueryModel> {
  @IsEmail()
  readonly userId: string;

  constructor({ userId }: OwnQueryProps<UserProfileQuery>) {
    super();
    this.userId = userId;
  }
}

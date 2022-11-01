import { IsEmail } from 'class-validator';
import { OwnQueryProps, Query } from '../../../../shared/cqrs';
import { UserDetailsDto } from './user-details.dto';

export class UserDetailsQuery extends Query<UserDetailsDto> {
  @IsEmail()
  readonly userIdOrEmail: string;

  constructor({ userIdOrEmail }: OwnQueryProps<UserDetailsQuery>) {
    super();
    this.userIdOrEmail = userIdOrEmail;
  }
}

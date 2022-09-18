import { IsEmail } from 'class-validator';
import { Query } from '../../../../shared/cqrs';
import { UserDetailsDto } from './user-details.dto';

export class UserDetailsQuery extends Query<UserDetailsDto> {
  @IsEmail()
  readonly userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}

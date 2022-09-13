import { IsEmail } from 'class-validator';

export class UserDetailsQuery {
  @IsEmail()
  readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

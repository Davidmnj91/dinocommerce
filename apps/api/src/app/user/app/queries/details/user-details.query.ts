import { IsEmail } from 'class-validator';

export class UserDetailsQuery {
  @IsEmail()
  readonly email: string;

  constructor(email: string) {
    this.email = email;
  }
}

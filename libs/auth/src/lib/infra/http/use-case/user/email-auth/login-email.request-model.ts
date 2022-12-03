import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { UserEmailLoginRequest } from '@dinocommerce/auth-api';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequestModel implements UserEmailLoginRequest {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  readonly password: string;
}

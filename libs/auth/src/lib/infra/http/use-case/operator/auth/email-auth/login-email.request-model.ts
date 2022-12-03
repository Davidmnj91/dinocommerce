import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { OperatorEmailLoginRequest } from '@dinocommerce/auth-api';
import { ApiProperty } from '@nestjs/swagger';

export class LoginOperatorRequestModel implements OperatorEmailLoginRequest {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  readonly password: string;
}

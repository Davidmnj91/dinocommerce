import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { EmailLoginRequest } from '@dinocommerce/warehouse-api';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequestModel implements EmailLoginRequest {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  readonly password: string;
}

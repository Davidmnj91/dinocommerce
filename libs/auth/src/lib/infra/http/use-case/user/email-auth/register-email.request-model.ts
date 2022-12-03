import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { UserEmailRegisterRequest } from '@dinocommerce/auth-api';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterEmailRequestModel implements UserEmailRegisterRequest {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  username: string;
}

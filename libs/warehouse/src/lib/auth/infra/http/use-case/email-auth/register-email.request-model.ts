import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { EmailRegisterRequest } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterEmailRequestModel implements EmailRegisterRequest {
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

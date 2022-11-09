import { IsEmail, IsNotEmpty } from 'class-validator';

import { ContactUsRequest } from '@dinocommerce/server-api';
import { ApiProperty } from '@nestjs/swagger';

export class ContactUsRequestModel implements ContactUsRequest {
  @ApiProperty({ example: 'client@email.com' })
  @IsEmail()
  readonly clientEmail: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  readonly clientName: string;

  @ApiProperty({ example: 'Contacting message title' })
  @IsNotEmpty()
  readonly messageTitle: string;

  @ApiProperty({ example: 'Contacting message body' })
  @IsNotEmpty()
  readonly messageBody: string;
}

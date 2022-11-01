import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactUsDto {
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

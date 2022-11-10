import { ContactUsApi } from '@dinocommerce/warehouse-api';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ContactUsCommand } from '../../../../app/commands/contact-us/contact-us.command';
import { ContactUsRequestModel } from './contact-us.request-model';

@ApiTags('Contact Us')
@Controller('contact-us')
export class ContactUsController implements ContactUsApi {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Send a contacting email' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async contactUs(@Body() contactUs: ContactUsRequestModel) {
    const { clientEmail, clientName, messageTitle, messageBody } = contactUs;
    return this.commandBus.execute(new ContactUsCommand({ clientEmail, clientName, messageTitle, messageBody }));
  }
}

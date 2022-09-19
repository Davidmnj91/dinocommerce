import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactUsCommand } from '../../../../app/commands/contact-us/contact-us.command';
import { ContactUsDto } from './contact-us.dto';

@ApiTags('Contact Us')
@Controller('contact-us')
export class ContactUsController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Send a contacting email' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async contactUs(@Body() contactUs: ContactUsDto) {
    const { clientEmail, clientName, messageTitle, messageBody } = contactUs;
    return this.commandBus.execute(new ContactUsCommand(clientEmail, clientName, messageTitle, messageBody));
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailData, MailFactory } from './factory/mail.factory';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private mailFactory: MailFactory) {}

  sendMail(mailData: MailData): void {
    const mailOptions = this.mailFactory.build(mailData);
    this.mailerService.sendMail(mailOptions);
  }
}

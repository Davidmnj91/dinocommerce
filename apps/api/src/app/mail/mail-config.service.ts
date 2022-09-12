import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { AppConfig, APP_CONFIG } from '../config/app.config';
import { MailConfig, MAIL_CONFIG } from '../config/mail.config';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): MailerOptions {
    const mailConfig = this.configService.get<MailConfig>(MAIL_CONFIG);
    const appConfig = this.configService.get<AppConfig>(APP_CONFIG);
    return {
      transport: {
        host: mailConfig.host,
        port: mailConfig.port,
        ignoreTLS: mailConfig.ignoreTLS,
        requireTLS: mailConfig.requireTLS,
        auth: {
          user: mailConfig.user,
          pass: mailConfig.password,
        },
      },
      defaults: {
        from: `"${mailConfig.defaultName}" <${mailConfig.defaultEmail}>`,
      },
      template: {
        dir: path.join(appConfig.workingDirectory, 'apps', 'api', 'src', 'app', 'mail', 'app', 'templates'),
        adapter: new EjsAdapter(),
        options: {},
      },
    } as MailerOptions;
  }
}

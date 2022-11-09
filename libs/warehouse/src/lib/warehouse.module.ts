import { LoggerModule } from 'nestjs-pino';

import { configurations } from '@dinocommerce/shared';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { MickroOrmConfigService } from './database/database-config.service';
import { InventoryModule } from './inventory/inventory.module';
import { MailConfigService } from './mail/mail-config.service';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configurations,
      envFilePath: ['.env'],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      },
    }),
    MikroOrmModule.forRootAsync({
      useClass: MickroOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    MailModule,
    AuthModule,
    UserModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class WarehouseModule {}

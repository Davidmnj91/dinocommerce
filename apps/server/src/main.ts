import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import {
  Logger as PinoLogger,
  LoggerErrorInterceptor,
} from 'nestjs-pino';

import {
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import {
  APP_CONFIG,
  AppConfig,
} from './app/config/app.config';
import {
  AUTH_CONFIG,
  AuthConfig,
} from './app/config/auth.config';
import { DomainExceptionFilter } from './app/shared/exception/domain.exception';
import validationOptions from './app/shared/validation/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, bufferLogs: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>(APP_CONFIG);
  const authConfig = configService.get<AuthConfig>(AUTH_CONFIG);

  const globalPrefix = appConfig.apiPrefix;
  app.enableShutdownHooks();
  app.useLogger(app.get(PinoLogger));
  app.flushLogs();

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth(authConfig.cookieName, { type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const apiDocPath = `${globalPrefix}/docs`;
  SwaggerModule.setup(apiDocPath, app, document, {
    swaggerOptions: { tagsSorter: 'alpha', operationsSorter: 'alpha', tryItOutEnabled: true },
  });

  const port = appConfig.port;
  await app.listen(port);

  Logger.log(`🚀 API Docs are running on: http://localhost:${port}/${apiDocPath}`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from './app/app.module';
import { AppConfig, APP_CONFIG } from './app/config/app.config';
import validationOptions from './app/shared/validation/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>(APP_CONFIG);

  const globalPrefix = appConfig.apiPrefix;
  app.enableShutdownHooks();
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const apiDocPath = `${globalPrefix}/docs`;
  SwaggerModule.setup(apiDocPath, app, document);

  const port = appConfig.port;
  await app.listen(port);

  Logger.log(`🚀 API Docs are running on: http://localhost:${port}/${apiDocPath}`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

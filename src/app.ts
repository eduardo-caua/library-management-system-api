import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { GlobalExceptionFilter } from './core/filters/exceptions.filter';

export class App {
  public static async get(): Promise<INestApplication> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();
    app.use(helmet());
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    const config = new DocumentBuilder()
      .setTitle('Library Management API')
      .setDescription('API to manage and tracking Books.')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    return app;
  }
}
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import getMongoUrl from './utils/get-mongo-url';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { STATUS_CODE } from './constants';
import * as admin from 'firebase-admin';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
// import firebaseKey from '../src/config/firebase-key.json';

async function bootstrap() {
  console.log('Start Running App ');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    abortOnError: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'upload'));

  app.useGlobalFilters(new AllExceptionsFilter());
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new TransformInterceptor());

  // Apply prefix for all routes
  // app.setGlobalPrefix('/apiV2');
  app.setGlobalPrefix('/api');

  // admin.initializeApp({
  //   credential: admin.credential.cert(firebaseKey as any),
  //   storageBucket: 'pmg-testnet.appspot.com',
  // });

  // Versioning
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  // Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('AIHomes API Documentation')
    .setDescription(
      `The AIHomes API description. Explain statusCode:
    \n ${STATUS_CODE}`,
    )
    .setVersion('1.0')
    // .addTag('AIRO API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('document', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.log(
    `Open http://localhost:${process.env.API_PORT}/document to see the documentation`,
  );

  await app.listen(process.env.API_PORT);
}

bootstrap();

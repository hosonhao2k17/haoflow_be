import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { I18nService } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import * as qs from "qs";
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Transform response interceptor
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformResponseInterceptor(reflector))
  //Global filter 
  const i18n = app.get(I18nService<Record<string, unknown>>)
  app.useGlobalFilters(new GlobalExceptionFilter(i18n))
  //validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (validations: ValidationError[]) => {
      return new UnprocessableEntityException(validations);
    }
  }));

  app.set("query parser", (query: string) =>
    qs.parse(query, {
      allowDots: false,
      depth: 10,
    }),
  );
  //Versioning
  app.setGlobalPrefix
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.setGlobalPrefix('api')
  //Swagger 
  //swagger setup
  const configBuilder = new DocumentBuilder()
    .setTitle('HaoFlow API')
    .setDescription('The HaoFlow API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configBuilder);
  SwaggerModule.setup('api-docs', app, document);



  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();

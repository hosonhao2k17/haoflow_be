import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { I18nService } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .build();
  const document = SwaggerModule.createDocument(app, configBuilder);
  SwaggerModule.setup('api-docs', app, document);



  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();

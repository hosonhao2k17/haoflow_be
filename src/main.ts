import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger setup
  const configBuilder = new DocumentBuilder()
  .setTitle('HaoFlow API')
  .setDescription('The HaoFlow API description')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, configBuilder);
  SwaggerModule.setup('api-docs', app, document);
  //Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();

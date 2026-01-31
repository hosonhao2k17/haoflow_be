import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: {
        host: configService.get('MAIL_HOST'),
        port: configService.get('MAIL_PORT'),
        secure: false,
        auth: {
          user: configService.get('MAIL_USER'),
          pass: configService.get('MAIL_PASS')
        },
        defaults: {
          from: configService.get('MAIL_USER')
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }
    })
  })],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}

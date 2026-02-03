import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { ErrorCode } from 'src/common/constants/error-code.constant';

@Injectable()
export class MailService {

    constructor(
        private mailerService: MailerService,
        private i18nService: I18nService,
        private configService: ConfigService
    ) {}

    async sendUserConfirmation(to: string, token: string) {

        const url = `${this.configService.get('URL')}/api/v1/auth/verify?token=${token}`
        await this.mailerService.sendMail({
            to,
            subject: this.i18nService.t(ErrorCode.MAIL_SUBJECT),
            template: './confirmation',
            context: {
                url
            }
        })
    }
}

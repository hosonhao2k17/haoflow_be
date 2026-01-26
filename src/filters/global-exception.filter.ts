import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { ErrorRdo } from "src/common/rdo/error.rdo";
import { Request, Response } from 'express';
import { ValidationException } from "src/exceptions/validation.exception";
import { ErrorCode } from "src/common/constants/error-code.constant";
import { I18nService } from "nestjs-i18n";
import { getConstantKey } from "src/utils/get-constant-key";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly i18n: I18nService) {

    }
    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        
    }
    
    handleHttpException(exception: HttpException): ErrorRdo {

        const statusCode = exception.getStatus();
        const res = exception.getResponse() as {
            errorCode: string,
            message: string
        };
        const timestamp = new Date().toISOString();

        return {
            message: res.message,
            statusCode,
            timestamp,
            errorCode: 'HTTP_EXCEPTION',
            error: STATUS_CODES[statusCode] as string
        }

    }

    handleValidationException(exception: ValidationException): ErrorRdo {

        const statusCode =  exception.getStatus()
        const response = exception.getResponse() as {
            errorCode: ErrorCode,
            message: string
        }

        return {
            statusCode,
            message: this.i18n.t(response.errorCode),
            errorCode: getConstantKey(ErrorCode, response.errorCode),
            error: STATUS_CODES[statusCode] as string,
            timestamp: new Date().toISOString(),
            
        }

    }
}
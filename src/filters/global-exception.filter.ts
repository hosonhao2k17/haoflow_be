import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { ErrorRdo } from "src/common/rdo/error.rdo";
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
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
}
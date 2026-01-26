import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, UnprocessableEntityException } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { ErrorRdo } from "src/common/rdo/error.rdo";
import { Request, Response } from 'express';
import { ValidationException } from "src/exceptions/validation.exception";
import { ErrorCode } from "src/common/constants/error-code.constant";
import { I18nService } from "nestjs-i18n";
import { getConstantKey } from "src/utils/get-constant-key";
import { ValidationError } from "class-validator";
import { ErrorDetailRdo } from "src/common/rdo/error-detail.rdo";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly i18n: I18nService) {

    }
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception.getResponse().message)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let errorRdo: ErrorRdo;
        if(exception instanceof UnprocessableEntityException) {
            errorRdo = this.handleUnprocessableEntityException(exception);
        } else if (exception instanceof ValidationException) {
            errorRdo = this.handleValidationException(exception)
        } else if (exception instanceof HttpException) {
             errorRdo = this.handleHttpException(exception)
        } else {
            errorRdo = this.handleError(exception)
        }

        response.status(errorRdo.statusCode).json(errorRdo)
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
            errorCode: getConstantKey(HttpStatus, statusCode),
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

    handleError(exception: any): ErrorRdo {
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR
        const message = exception.message || 'An unexpected error occured'
        return {
            statusCode,
            message,
            error: STATUS_CODES[statusCode] as string,
            timestamp: new Date().toISOString(),
            errorCode: getConstantKey(HttpStatus, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    handleUnprocessableEntityException(validation: UnprocessableEntityException): ErrorRdo {
        const response = validation.getResponse() as {
            message: ValidationError[],
            statusCode: number,
            error: string
        }

        return {
            message: validation.message,
            statusCode: response.statusCode,
            error:  response.error,
            errorCode: getConstantKey(HttpStatus, response.statusCode),
            timestamp: new Date().toISOString(),
            details: this.formatMessageDetail(response.message)
        }

        

    }

    private formatMessageDetail(validations: ValidationError[]): ErrorDetailRdo[] {

        const errorDetails: ErrorDetailRdo[] = [];
        for(const item of validations) {
            errorDetails.push({
                property: item.property,
                code: Object.keys(item.constraints as object)[0],
                message: this.i18n.t(Object.values(item.constraints as object)[0])
            })
        }

        return errorDetails;
    }
    
}
import { BadRequestException } from "@nestjs/common";
import { ErrorCode } from "src/common/constants/error-code.constant";



export class ValidationException extends BadRequestException {

    constructor(errorCode: ErrorCode = ErrorCode.COMMON_ERROR, message?: string) {
        super({
            errorCode,
            message
        })
    }
}
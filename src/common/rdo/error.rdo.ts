import { Expose, Type } from "class-transformer";
import { ErrorDetailRdo } from "./error-detail.rdo";


export class ErrorRdo {

    @Expose()
    message: string;

    @Expose()
    statusCode: number;

    @Expose()
    error: string;
    
    @Expose()
    errorCode: string;

    @Expose()
    timestamp: string;

    @Expose()
    @Type(() => ErrorDetailRdo)
    details?: ErrorDetailRdo[];


}
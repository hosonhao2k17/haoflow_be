import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { RESPONSE_MESSAGE } from "src/common/constants/app.constant";
import { ITransformResponse } from "src/common/interfaces/transform-response.interface";
import { BaseRdo } from "src/common/rdo/base-response.rdo";



export class TransformResponseInterceptor<T> implements NestInterceptor<T, ITransformResponse<T>> {

    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ITransformResponse<T>> | Promise<Observable<ITransformResponse<T>>> {
        
        const message = this.reflector.get(RESPONSE_MESSAGE, context.getHandler()) || "success"

        const res = context.switchToHttp().getResponse();

        const statusCode = res.statusCode;

        return next.handle().pipe(
            map(data => ({
                message,
                statusCode,
                data: this.reorderData(data)
            }))
        )
    }

    private reorderData(data: any) {
        
        if(Array.isArray(data?.items)) {
            return data?.items.map((item) => this.reorderData(item))
        }
        if(data instanceof BaseRdo) {
            
            const {createdAt, updatedAt, ...rest} = data;
            return {
                ...rest,
                createdAt,
                updatedAt
            }
        }
        return data
    }
    
}
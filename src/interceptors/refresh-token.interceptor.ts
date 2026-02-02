import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Response } from "express";
import { map, Observable } from "rxjs";
import { REMOVE_REFRESH_TOKEN } from "src/common/constants/app.constant";



@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {

    constructor(private readonly reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const res: Response = context.switchToHttp().getResponse();
        const removeRefresh = this.reflector.get<boolean>(REMOVE_REFRESH_TOKEN, context.getHandler()) || false;

        return next.handle().pipe(
            map((data) => {

                if(removeRefresh) {
                    res.clearCookie('refreshToken')
                }
                if(data?.refreshToken) {
                    res.cookie('refreshToken', data.refreshToken)
                }
                 
                return data;
            })
        )
    }
    
}
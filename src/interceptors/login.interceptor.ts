import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { LoginRdo } from "src/api/auth/rdo/login.rdo";




export class LoginInterceptor implements NestInterceptor {


    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        
        const res = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data: LoginRdo) => {

                res.cookie('refreshToken', data.refreshToken)
                
                return data;
            })
        )
    }
    
}
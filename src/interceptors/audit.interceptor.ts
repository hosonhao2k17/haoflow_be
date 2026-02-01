import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, retry } from "rxjs";
import { SYSTEM } from "src/common/constants/app.constant";
import { requestContext } from "src/common/context/request.context";


export class AuditInterceptor implements NestInterceptor {
    
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const userId = req.user?.id ?? SYSTEM;

    return requestContext.run({ userId }, () => {
      return next.handle();
    });
  }
}

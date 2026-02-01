import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ErrorCode } from "src/common/constants/error-code.constant";


@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException(ErrorCode.INVALID_TOKEN);
        }
        return user;
    }
}
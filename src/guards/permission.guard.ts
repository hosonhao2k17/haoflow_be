import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "src/api/auth/auth.service";
import { UsersService } from "src/api/users/users.service";
import { PermissionAction, PERMISSIONS_ACTION, PERMISSIONS_SUBJECT, PermissionSubject, PUBLIC_KEY } from "src/common/constants/app.constant";
import { ErrorCode } from "src/common/constants/error-code.constant";



@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext):  Promise<boolean>{

        const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());
        if(isPublic) {
            return true
        }
        const req = context.switchToHttp().getRequest();
        if(!req.user) {
            return true;
        }
        
        const permissionAction = this.reflector.get<PermissionAction>(PERMISSIONS_ACTION, context.getHandler());
        const permissionSubject = this.reflector.get<PermissionSubject>(PERMISSIONS_SUBJECT,context.getClass() )
        if(!permissionAction || !permissionSubject) return true
        for(const item of req.user.permissions) {
            if(item.action === permissionAction && item.subject === permissionSubject) {
                return true;
            }
        }

        throw new ForbiddenException(ErrorCode.NOT_ENOUGH_PERMISSION)
    }
} 
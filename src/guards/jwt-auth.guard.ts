
import { Cache } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from 'src/common/constants/app.constant';
import { CacheKey } from 'src/common/constants/cache.constant';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { createCacheKey } from 'src/utils/cache';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(
        private reflector: Reflector,
        private cacheManager: Cache
    ) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [context.getHandler(), context.getClass()])
        if(isPublic) {
            return true;
        }
        const isAuthenticated = await super.canActivate(context)
        if (!isAuthenticated) return false;

        const isBlacklisted = await this.cacheManager.get(createCacheKey(CacheKey.SESSION_BLACKLIST, req.user.sessionId))
        if(isBlacklisted) {
            throw new UnauthorizedException(ErrorCode.SESSION_BLACKLIST)
        }
        
        return true;
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException(ErrorCode.INVALID_TOKEN);
        }
        return user;
    }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh') {

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req.cookies['refreshToken'] ? req.cookies['refreshToken'] : null
            ]),
            secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET')
        })
    }
    validate(payload: unknown): unknown {
        return payload
    }

}
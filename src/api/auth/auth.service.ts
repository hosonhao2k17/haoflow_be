import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { LoginRdo } from './rdo/login.rdo';
import { UserRdo } from '../users/rdo/user.rdo';
import ms, { StringValue } from 'ms'
import { RegisterDto } from './dto/register.dto';
import { RoleName, UserStatus } from 'src/common/constants/app.constant';
import { MailService } from 'src/mail/mail.service';
import { RefreshRdo } from './rdo/refresh.rdo';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { createCacheKey } from 'src/utils/cache';
import { CacheKey } from 'src/common/constants/cache.constant';
@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}


    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;
        const user = await this.usersService.getUserByEmail(email);
        if(!user || ! await user.comparePassword(password)) {
            throw new UnauthorizedException(ErrorCode.INVALID_LOGIN)
        }
        if(user.status === UserStatus.INACTIVE) {
            throw new UnauthorizedException(ErrorCode.STATUS_INACTIVE)
        }
        if(user.verified === false) {
            throw new UnauthorizedException(ErrorCode.NOT_VERIFY)
        }

        const session = await this.usersService.createSession(user.id)
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user.id, session.id),
            this.generateRefreshToken(user.id, session.id)
        ])
        
        return plainToInstance(LoginRdo, {
            accessToken,
            refreshToken,
            expiresIn: ms(this.configService.get<StringValue>('JWT_ACCESS_EXPIRES') as StringValue) / 1000,
            userId: user.id

        })
    }

    async logout(sessionId: string) {

        
        await this.cacheManager.set(createCacheKey(CacheKey.SESSION_BLACKLIST, sessionId),true);
    }

    async register(registerDto: RegisterDto) :Promise<void> {
        
     
        const user = await this.usersService.create({
            ...registerDto,
            roleName: RoleName.USER
        })

        const token = await this.generateEmailVerificationToken(user.id);
        await this.mailService.sendUserConfirmation(user.email, token);
    }

    async refresh(id: string):Promise<RefreshRdo> {

        const session = await this.usersService.createSession(id)
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(id, session.id),
            this.generateRefreshToken(id, session.id)
        ])

        return plainToInstance(RefreshRdo, {
            accessToken,
            refreshToken,
            expiresIn: ms(this.configService.get<StringValue>('JWT_ACCESS_EXPIRES') as StringValue) / 1000,
            userId:id

        })
    }

    generateAccessToken(id: string, sessionId: string) :Promise<string> {

        return this.jwtService.signAsync({
            id,
            sessionId
        },{
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: ms(this.configService.getOrThrow<StringValue>('JWT_ACCESS_EXPIRES'))
        })
    }

    generateRefreshToken(id: string, sessionId: string) :Promise<string> {
        return this.jwtService.signAsync({
            id,
            sessionId
        },{
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: ms(this.configService.getOrThrow<StringValue>('JWT_REFRESH_EXPIRES'))
        })
    }

    generateEmailVerificationToken(id: string) {
        return this.jwtService.signAsync({
            id
        },{
            secret: this.configService.get('JWT_VERIFY_SECRET'),
            expiresIn: ms(this.configService.getOrThrow<StringValue>('JWT_VERIFY_EXPIRES'))
        })
    }
}

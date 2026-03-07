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
import { VerifyDto } from './dto/verify.dto';
import { PayloadType } from './types/payload.type';
import { RolesService } from '../roles/roles.service';
import { ValidationException } from 'src/exceptions/validation.exception';
import { GoogleProfile } from './types/google-profile.interface';
import { Provider } from 'src/common/constants/provider.constant';
import { UserEntity } from '../users/entities/user.entity';
@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService,
        private rolesService:RolesService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}


    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;
        const user = await this.usersService.getUserByEmail(email) as UserEntity;
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

    verifyAccessToken(token: string) :Promise<PayloadType> {
        return this.jwtService.verifyAsync(token,{
            secret: this.configService.getOrThrow('JWT_ACCESS_SECRET')
        })
    }

    async loginGoogle(profile: GoogleProfile): Promise<string> {
        const role = await this.rolesService.getRoleByName(RoleName.USER)
        let user = await this.usersService.getUserByEmail(profile.email);
        if(!user) {
            user = await this.usersService.create({
                fullName: profile.fullName,
                email: profile.email,
                avatar: profile.avatar,
                verified: true,
                roleId: role.id
            })
            await this.usersService.createProvider({
                provider: Provider.GOOGLE,
                providerId: profile.googleId,
                userId: user.id
            })
        } else if(! await this.usersService.getProviderByUserId(user.id)) {
            await this.usersService.createProvider({
                provider: Provider.GOOGLE,
                providerId: profile.googleId,
                userId: user.id
            })
        }
        const session = await this.usersService.createSession(user.id)
        const accessToken = await this.generateAccessToken(user.id, session.id)
        return accessToken
    }

    async logout(sessionId: string) {

        
        await this.cacheManager.set(createCacheKey(CacheKey.SESSION_BLACKLIST, sessionId),true);
    }

    async register(registerDto: RegisterDto) :Promise<void> {
        
        const role = await this.rolesService.getRoleByName(RoleName.USER)
        const user = await this.usersService.create({
            ...registerDto,
            roleId: role.id
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

    async verify(verifyDto: VerifyDto) {
        const {token} = verifyDto;
        const payload = await this.verfifyEmailVerificationToken(token);
        await Promise.all([
            this.usersService.update(payload.id, {verified: true}),
            this.usersService.createVerify({
                userId: payload.id,
                token,
                expiresAt: new Date(payload.iat * 1000),
                used: true
            })
        ])
    }

    async verfifyEmailVerificationToken(token: string) :Promise<PayloadType> {
        const payload = await this.jwtService.verifyAsync<PayloadType>(token, 
            {
                secret: this.configService.get('JWT_VERIFY_SECRET')
            }
        )
        const verify = await this.usersService.findVerifiedByUserId(payload.id);
        if(verify) {
            throw new UnauthorizedException(ErrorCode.VERIFIED_USER);
        }
        return payload;
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

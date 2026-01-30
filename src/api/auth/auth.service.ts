import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { LoginRdo } from './rdo/login.rdo';
import { UserRdo } from '../users/rdo/user.rdo';
import ms, { StringValue } from 'ms'
@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}


    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;
        const user = await this.usersService.getUserByEmail(email);
        if(!user || ! await user.comparePassword(password)) {
            throw new UnauthorizedException(ErrorCode.INVALID_LOGIN)
        }
        
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user.id, user.role.id),
            this.generateRefreshToken(user.id,user.role.id)
        ])
        
        return plainToInstance(LoginRdo, {
            accessToken,
            refreshToken,
            expiresIn: ms(this.configService.get<StringValue>('JWT_ACCESS_EXPIRES') as StringValue) / 1000,
            userId: user.id

        })
    }

    generateAccessToken(id: string, roleId: string) :Promise<string> {

        return this.jwtService.signAsync({
            id,
            roleId
        },{
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: ms(this.configService.get<StringValue>('JWT_ACCESS_EXPIRES') as StringValue)
        })
    }

    generateRefreshToken(id: string, roleId: string) :Promise<string> {
        return this.jwtService.signAsync({
            id,
            roleId
        },{
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: ms(this.configService.get<StringValue>('JWT_REFRESH_EXPIRES') as StringValue)
        })
    }
}

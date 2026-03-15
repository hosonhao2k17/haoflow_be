import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { LoginRdo } from './rdo/login.rdo';
import { RegisterDto } from './dto/register.dto';
import { ResponseMessage } from 'src/decorators/message.decorator';
import { RefreshTokenInterceptor } from 'src/interceptors/refresh-token.interceptor';
import { JwtRefreshGuard } from 'src/guards/jwt-refresh.guard';
import { User } from 'src/decorators/user.decorator';
import { RemoveRefresh } from 'src/decorators/remove-refresh.decorator';
import { VerifyDto } from './dto/verify.dto';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ApiEndpoint } from 'src/decorators/http.decorator';
import { RefreshRdo } from './rdo/refresh.rdo';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post('login')
  @UseInterceptors(RefreshTokenInterceptor)
  @ApiEndpoint({
    isPublic: true,
    httpCode: HttpStatus.OK,
    responseType: LoginRdo
  })
  login(@Body() loginDto: LoginDto) :Promise<LoginRdo> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseInterceptors(RefreshTokenInterceptor)
  @RemoveRefresh()
  @ApiEndpoint({
    httpCode: HttpStatus.OK
  })
  logout(@User('sessionId') sessionId: string) :Promise<void> {
    return this.authService.logout(sessionId)
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(RefreshTokenInterceptor)
  @ApiEndpoint({
    httpCode: HttpStatus.OK,
    isPublic: true,
    responseType: RefreshRdo
  })
  refresh(@User('id') id: string) {
    return this.authService.refresh(id);
  }

  @Public()
  @Post('register')
  @ApiEndpoint({
    isPublic: true,
    responseMessage: 'check your email'
  })
  register(@Body() registerDto: RegisterDto) :Promise<void> {
    return this.authService.register(registerDto)
  }

  @Get('verify')
  @ApiEndpoint({
    isPublic: true
  })
  verify(@Query() verifyDto: VerifyDto) {
    return this.authService.verify(verifyDto)
  }

  @Get('google')
  @ApiEndpoint({
    isPublic: true
  })
  @UseGuards(GoogleAuthGuard)
    googleLogin() {
  }

  @Get('google/callback')
  @ApiEndpoint({
    isPublic: true
  })
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res) {
    const accessToken = await this.authService.loginGoogle(req.user);
    
    const clientUrl = this.configService.get('FE_URL');

    res.redirect(`/${clientUrl}/oauth/callback?token=${accessToken}`)
  }
}

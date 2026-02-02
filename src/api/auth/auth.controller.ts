import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginRdo } from './rdo/login.rdo';
import { RegisterDto } from './dto/register.dto';
import { ResponseMessage } from 'src/decorators/message.decorator';
import { RefreshTokenInterceptor } from 'src/interceptors/refresh-token.interceptor';
import { JwtRefreshGuard } from 'src/guards/jwt-refresh.guard';
import { User } from 'src/decorators/user.decorator';
import { RemoveRefresh } from 'src/decorators/remove-refresh.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiResponse({
    example: LoginRdo
  })
  @UseInterceptors(RefreshTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseInterceptors(RefreshTokenInterceptor)
  @RemoveRefresh()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Logout success')
  logout(@User('sessionId') sessionId: string) {
    return this.authService.logout(sessionId)
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(RefreshTokenInterceptor)
  refresh(@User('id') id: string) {
    return this.authService.refresh(id);
  }

  @Public()
  @Post('register')
  @ResponseMessage('Check your email')
  register(@Body() registerDto: RegisterDto) :Promise<void> {
    return this.authService.register(registerDto)
  }
}

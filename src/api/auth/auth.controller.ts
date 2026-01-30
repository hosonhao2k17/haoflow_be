import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginRdo } from './rdo/login.rdo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiResponse({
    example: LoginRdo
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

import {
  Controller,
  Post,
  Body,
  Request,
  Query,
  UnauthorizedException,
  Headers,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body()
    registerDto: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    },
  ) {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.first_name,
      registerDto.last_name,
    );
  }

  @Post('send-reset-password-email')
  async sendResetPasswordEmail(@Body() emailDto: { email: string }) {
    await this.authService.sendPasswordResetEmail(emailDto.email);
    return { message: 'Password reset email sent' };
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: { password: string },
  ) {
    await this.authService.resetPassword(token, resetPasswordDto.password);
    return { message: 'Password has been reset' };
  }

  @Get('validate-token')
  async validateToken(@Headers('authorization') authorization: string) {
    const token = authorization?.split(' ')[1];
    if (!token) {
      return { valid: false };
    }
    const isValid = await this.authService.validateToken(token);
    return { valid: isValid };
  }
}

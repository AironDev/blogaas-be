import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './utils/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {}

  //@UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userLoginParams: {email: string, password: string}) {
    return this.authService.createLogin(userLoginParams);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

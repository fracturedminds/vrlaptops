import { Controller, Post, Body, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log(body.username);
    const isValid = this.authService.validateUser(body.username, body.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: body.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
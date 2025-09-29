import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from 'modules/auth/dto/login.dto';

function getClientIp(req: Request) {
  const xf = (req.headers['x-forwarded-for'] as string) || '';
  return (xf.split(',')[0] || req.socket.remoteAddress || '').trim();
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService, private readonly users: UsersService) {}

  @Post('login')
  async login(@Req req: Request, @Body() dto: LoginDto) {
    const result = await this.auth.login(dto);
    if ((result as any)?.user?.id) {
      await this.users.updateLastLogin((result as any).user.id, getClientIp(req));
    }
    return result;
  }
}

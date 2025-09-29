import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
  ) {}

  // TODO: thay validate thực tế
  async login(dto: { email: string; password: string }) {
    const user = await this.users.findByEmail(dto.email); // có thể null nếu bạn chưa tạo user
    const payload = { sub: user?.id ?? 'mock', email: dto.email };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken, user: user ?? { id: 'mock', email: dto.email } };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async updateLastLogin(userId: string, ip?: string | null) {
    await this.repo.update(userId, { lastLoginAt: new Date(), lastLoginIp: ip ?? null });
    await this.repo.increment({ id: userId }, 'loginCount', 1);
    return this.findById(userId);
  }
}

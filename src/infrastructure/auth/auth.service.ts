import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository, USER_REPOSITORY } from '../../core/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @Inject(USER_REPOSITORY) private users: IUserRepository,
  ) {}
  async validateUser(username: string, pass: string) {
    const user = await this.users.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(pass, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    };
  }
  async profile(userId: number) {
    const user = await this.users.findById(userId);
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  }
}

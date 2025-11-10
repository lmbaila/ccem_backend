import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { USER_REPOSITORY } from '../../core/repositories/user.repository';
import { PrismaUserRepository } from '../prisma/repositories/prisma-user.repository';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sb-events-secret',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: USER_REPOSITORY, useExisting: PrismaUserRepository },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

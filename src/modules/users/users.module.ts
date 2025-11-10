import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { USER_REPOSITORY } from '../../core/repositories/user.repository';
import { PrismaUserRepository } from '../../infrastructure/prisma/repositories/prisma-user.repository';

@Module({
  controllers: [UsersController],
  providers: [{ provide: USER_REPOSITORY, useExisting: PrismaUserRepository }],
})
export class UsersHttpModule {}

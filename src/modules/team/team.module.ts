import { Module } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaTeamRepository } from '../../infrastructure/prisma/repositories/prisma-team.repository';
import { TeamController } from './team.controller';
import {
  GetManyTeamUseCase,
  TEAM_REPOSITORY,
} from 'src/application/team/usecases/get-many-team.usecase';

@Module({
  controllers: [TeamController],
  providers: [
    PrismaService,
    GetManyTeamUseCase,
    {
      provide: TEAM_REPOSITORY,
      useClass: PrismaTeamRepository,
    },
  ],
  exports: [GetManyTeamUseCase],
})
export class TeamHttpModule {}

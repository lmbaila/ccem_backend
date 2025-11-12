import { Module } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaTeamRepository } from '../../infrastructure/prisma/repositories/prisma-team.repository';
import { TeamController } from './team.controller';
import { GetManyTeamUseCase } from 'src/application/team/usecases/get-many-team.usecase';
import { CreateTeamUseCase } from 'src/application/team/usecases/create-team.usecase';
import { TEAM_REPOSITORY } from 'src/core/repositories/team.repository';
import { UpdateTeamUseCase } from 'src/application/team/usecases/update-team.usecase';

@Module({
  controllers: [TeamController],
  providers: [
    PrismaService,
    GetManyTeamUseCase,
    CreateTeamUseCase,
    UpdateTeamUseCase,

    {
      provide: TEAM_REPOSITORY,
      useClass: PrismaTeamRepository,
    },
  ],
  exports: [GetManyTeamUseCase, CreateTeamUseCase, UpdateTeamUseCase],
})
export class TeamHttpModule {}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetManyTeamUseCase } from 'src/application/team/usecases/get-many-team.usecase';
import { GetManyTeamDto } from './dto/get-many-team.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Teams')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly getManyTeam: GetManyTeamUseCase) {}

  @Get()
  @ApiOperation({
    summary:
      'Lista todas as equipas com paginacao, filtro e métricas (total, média e maior equipa)',
  })
  @ApiQuery({ name: 'search', required: false, description: 'Pesquisa por nome da equipa' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @Roles('ADMIN', 'COMMANDCENTRE')
  async list(@Query() query: GetManyTeamDto) {
    return this.getManyTeam.execute(query);
  }
}

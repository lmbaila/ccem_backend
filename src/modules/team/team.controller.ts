import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetManyTeamUseCase } from 'src/application/team/usecases/get-many-team.usecase';
import { GetManyTeamDto } from './dto/get-many-team.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateTeamUseCase } from 'src/application/team/usecases/create-team.usecase';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UpdateTeamUseCase } from 'src/application/team/usecases/update-team.usecase';

@ApiTags('Teams')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teams')
export class TeamController {
  constructor(
    private readonly getManyTeam: GetManyTeamUseCase,
    private readonly createTeam: CreateTeamUseCase,
    private readonly updateTeam: UpdateTeamUseCase,
  ) {}

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

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cria uma nova equipa (nome deve ser único)' })
  async create(@Body() dto: CreateTeamDto) {
    return this.createTeam.execute(dto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualiza o nome de uma equipa existente' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTeamDto) {
    return this.updateTeam.execute(id, dto);
  }
}

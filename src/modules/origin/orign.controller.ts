import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

import { CreateOriginDto } from 'src/application/origin/dto/create-origin.dto';
import { ListOriginDto } from 'src/application/origin/dto/list-origin.dto';
import { UpdateOriginDto } from 'src/application/origin/dto/update-origin.dto';

import { CreateOriginUseCase } from 'src/application/origin/usecases/create-origin.usecase';
import { DeleteOriginUseCase } from 'src/application/origin/usecases/delete-origin.usecase';
import { FindOriginUseCase } from 'src/application/origin/usecases/find-origin.usecase';
import { ListOriginUseCase } from 'src/application/origin/usecases/list-origin.usecase';
import { UpdateOriginUseCase } from 'src/application/origin/usecases/update-origin.usecase';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Origins')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('origins')
export class OriginController {
  constructor(
    private readonly createUC: CreateOriginUseCase,
    private readonly updateUC: UpdateOriginUseCase,
    private readonly deleteUC: DeleteOriginUseCase,
    private readonly findUC: FindOriginUseCase,
    private readonly listUC: ListOriginUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova origin',
    description: 'Apenas usuarios ADMIN podem aceder este endpoint. Requer token valido.',
  })
  @Roles('ADMIN')
  @ApiResponse({ status: 201, description: 'Origin criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Nao autorizado (token invalido)' })
  @ApiResponse({ status: 403, description: 'Acesso negado (nao eh admin)' })
  create(@Body() dto: CreateOriginDto) {
    return this.createUC.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar origins com filtro e paginacao',
    description: 'Qualquer usuario autenticado pode aceder.',
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  list(@Query() query: ListOriginDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || undefined;

    return this.listUC.execute(search, page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma origin pelo ID',
    description: 'Qualquer usuario autenticado pode aceder.',
  })
  @ApiResponse({ status: 200, description: 'Origin encontrada' })
  @ApiResponse({ status: 404, description: 'Origin nao encontrada' })
  findOne(@Param('id') id: string) {
    return this.findUC.execute(Number(id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar origin pelo ID',
    description: 'Apenas usuarios ADMIN podem atualizar. Requer token valido.',
  })
  @Roles('ADMIN')
  @ApiResponse({ status: 200, description: 'Origin atualizada com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado (nao eh admin)' })
  @ApiResponse({ status: 404, description: 'Origin nao encontrada' })
  update(@Param('id') id: string, @Body() dto: UpdateOriginDto) {
    return this.updateUC.execute(Number(id), dto);
  }

  // ======================
  // DELETE (ADMIN ONLY)
  // ======================
  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Eliminar origin pelo ID',
    description: 'Apenas usuarios ADMIN podem eliminar. Requer token valido.',
  })
  @ApiResponse({ status: 200, description: 'Origin eliminada com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado (nao eh admin)' })
  @ApiResponse({ status: 404, description: 'Origin nao encontrada' })
  delete(@Param('id') id: string) {
    return this.deleteUC.execute(Number(id));
  }
}

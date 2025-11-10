import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetManyTechnicianUseCase } from 'src/application/technician/usecases/get-many-technician.usecase';
import { CreateTechnicianUseCase } from 'src/application/technician/usecases/create-technician.usecase';
import { UpdateTechnicianUseCase } from 'src/application/technician/usecases/update-technician.usecase';
import { GetManyTechnicianDto } from 'src/modules/technicians/dto/get-many-technician.dto';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { GetTechnicianByIdUseCase } from 'src/application/technician/usecases/get-technician-by-id.usecase';

@ApiTags('Technicians')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('technicians')
export class TechniciansController {
  constructor(
    private readonly getManyTechnician: GetManyTechnicianUseCase,
    private readonly createTechnician: CreateTechnicianUseCase,
    private readonly updateTechnician: UpdateTechnicianUseCase,
    private readonly getTechnicianById: GetTechnicianByIdUseCase,
    // private readonly deleteTechnician: DeleteTechnicianUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Lista tecnicos com paginacao e busca por nome, code ou email',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filtro de pesquisa (nome, code, email)',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Numero da pagina (default: 1)' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Numero de itens por pagina (default: 10)',
  })
  async list(@Query() query: GetManyTechnicianDto) {
    return this.getManyTechnician.execute(query);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cria tecnico (teamId obrigatorio)' })
  create(@Body() dto: CreateTechnicianDto) {
    return this.createTechnician.execute(dto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualiza tecnico existente' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTechnicianDto) {
    return this.updateTechnician.execute(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca tecnico por ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getTechnicianById.execute(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Remove tecnico (so se nao estiver associado a eventos)',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    // return this.deleteTechnician.execute(id);
  }
}

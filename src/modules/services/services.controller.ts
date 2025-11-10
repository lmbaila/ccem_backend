import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IServiceRepository, SERVICE_REPOSITORY } from '../../core/repositories/service.repository';
import { GetManyServiceDto } from 'src/application/service/dto/get-many-service.dto';
import { GetManyServiceUseCase } from 'src/application/service/usecases/get-many-services.usecase';
import { CreateServiceUseCase } from 'src/application/service/usecases/create-service.usecase';
import { UpdateServiceUseCase } from 'src/application/service/usecases/update-service.usecase';

@ApiTags('services')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('services')
export class ServicesController {
  constructor(
    private readonly getManyService: GetManyServiceUseCase,
    private readonly createService: CreateServiceUseCase,
    private readonly updateService: UpdateServiceUseCase,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Lista serviços' })
  async list(@Query() query: GetManyServiceDto) {
    return this.getManyService.execute(query);
  }
  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cria serviço' })
  create(@Body() dto: CreateServiceDto) {
    return this.createService.execute(dto);
  }
  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualiza serviço' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.updateService.execute(id, dto);
  }
  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove serviço' })
  remove(@Param('id', ParseIntPipe) id: number) {
    // return this.services.delete(id);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Obtem um servico pelo ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    //return this.repo.get(id);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateEventUseCase } from '../../application/event/usecases/create-event.usecase';
import { GetManyEventsUseCase } from '../../application/event/usecases/get-many-events.usecase';
import { GetEventUseCase } from '../../application/event/usecases/get-event.usecase';
import { UpdateEventUseCase } from '../../application/event/usecases/update-event.usecase';
import { DeleteEventUseCase } from '../../application/event/usecases/delete-event.usecase';
import { CreateEventDto } from '../../application/event/dto/create-event.dto';
import { UpdateEventDto } from '../../application/event/dto/update-event.dto';
import { GetEventsQueryDto } from 'src/application/event/dto/get-events-query.dto';
import { GetEventByIdOrCodeDto } from 'src/application/event/dto/get-event-by-id-param.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('events')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(
    private createEvent: CreateEventUseCase,
    private listEvents: GetManyEventsUseCase,
    private getEvent: GetEventUseCase,
    private updateEvent: UpdateEventUseCase,
    private deleteEvent: DeleteEventUseCase,
  ) {}

  @Get()
  @Roles('ADMIN', 'COMMANDCENTRE')
  @ApiOperation({ summary: 'Lista eventos com filtros' })
  list(@Query() query: GetEventsQueryDto) {
    return this.listEvents.execute(query);
  }

  // ✅ Endpoint público — sem autenticação
  @Get('find')
  @Public()
  @ApiOperation({
    summary: 'Busca evento por ID ou código (ex: E7F8G9H0)',
    description:
      'Endpoint público — não requer autenticação. Permite consultar um evento por ID (UUID) ou código curto (ex: E7F8G9H0).',
  })
  @ApiQuery({ name: 'id', required: false, description: 'UUID do evento' })
  @ApiQuery({ name: 'code', required: false, description: 'Código alfanumérico do evento' })
  get(@Query() query: GetEventByIdOrCodeDto) {
    const { id, code } = query;

    if (!id && !code) {
      throw new BadRequestException('É necessário informar o ID ou o código do evento.');
    }

    return this.getEvent.execute(query);
  }

  @Post()
  @Roles('ADMIN', 'COMMANDCENTRE')
  @ApiOperation({
    summary: 'Cria evento com serviços (startAt/endAt) e técnicos | gera code (8 chars)',
  })
  @ApiBody({ type: CreateEventDto })
  create(@Body() dto: CreateEventDto, @Req() req: any) {
    return this.createEvent.execute(dto, req.user.sub);
  }

  @Patch(':id')
  @Roles('ADMIN', 'COMMANDCENTRE')
  @ApiOperation({
    summary: 'Atualiza estado, prioridade, prazos e associações de um evento existente',
  })
  @ApiBody({ type: UpdateEventDto })
  update(@Param('id') id: string, @Body() dto: UpdateEventDto, @Req() req: any) {
    return this.updateEvent.execute(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove evento' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.deleteEvent.execute(id);
  }
}

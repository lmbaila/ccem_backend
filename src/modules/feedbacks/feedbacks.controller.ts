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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import {
  FEEDBACK_REPOSITORY,
  IFeedbackRepository,
} from '../../core/repositories/feedback.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { DeleteFeedbackDto } from './dto/delete-feedback.dto';

@ApiTags('feedbacks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('feedbacks')
export class FeedbacksController {
  constructor(@Inject(FEEDBACK_REPOSITORY) private feedbacks: IFeedbackRepository) {}

  @Get() @ApiOperation({ summary: 'Lista feedbacks' }) list() {
    return this.feedbacks.list();
  }

  @Post()
  @Roles('ADMIN', 'COMMANDCENTRE')
  @ApiOperation({ summary: 'Cria feedback' })
  create(@Body() dto: CreateFeedbackDto, @Req() req: any) {
    return this.feedbacks.create({ ...dto, createdById: req.user.sub });
  }

  @Patch(':id')
  @Roles('ADMIN', 'COMMANDCENTRE')
  @ApiOperation({ summary: 'Atualiza feedback' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFeedbackDto) {
    return this.feedbacks.update(id, dto);
  }

  @Delete()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remove feedback' })
  @ApiOperation({
    summary: 'Remove um feedback vinculado a um evento (permitido até 1 hora após criação)',
  })
  async remove(@Body() dto: DeleteFeedbackDto, @Req() req: any) {
    const userId = req.user.sub; // vem do JWT
    const userRole = req.user.role; // vem do JWT também
    return this.feedbacks.delete({
      eventId: dto.eventId,
      feedbackId: dto.feedbackId,
      userId,
      userRole,
    });
  }
}

import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { CreateEventUseCase } from '../../application/event/usecases/create-event.usecase';
import { GetManyEventsUseCase } from '../../application/event/usecases/get-many-events.usecase';
import { GetEventUseCase } from '../../application/event/usecases/get-event.usecase';
import { UpdateEventUseCase } from '../../application/event/usecases/update-event.usecase';
import { DeleteEventUseCase } from '../../application/event/usecases/delete-event.usecase';
import { EVENT_REPOSITORY } from '../../core/repositories/event.repository';
import { PrismaEventRepository } from '../../infrastructure/prisma/repositories/prisma-event.repository';

@Module({
  controllers: [EventsController],
  providers: [
    CreateEventUseCase,
    GetManyEventsUseCase,
    GetEventUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase,
    { provide: EVENT_REPOSITORY, useExisting: PrismaEventRepository },
  ],
})
export class EventsHttpModule {}

import { Module } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { SERVICE_REPOSITORY } from '../../core/repositories/service.repository';
import { PrismaServiceRepository } from '../../infrastructure/prisma/repositories/prisma-service.repository';
import { GetManyServiceUseCase } from 'src/application/service/usecases/get-many-services.usecase';
import { ServicesController } from './services.controller';
import { CreateServiceUseCase } from 'src/application/service/usecases/create-service.usecase';
import { UpdateServiceUseCase } from 'src/application/service/usecases/update-service.usecase';

@Module({
  controllers: [ServicesController],
  providers: [
    PrismaService,
    GetManyServiceUseCase,
    CreateServiceUseCase,
    UpdateServiceUseCase,
    {
      provide: SERVICE_REPOSITORY,
      useClass: PrismaServiceRepository,
    },
  ],
  exports: [GetManyServiceUseCase],
})
export class ServicesHttpModule {}

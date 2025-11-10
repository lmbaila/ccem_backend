import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { TECHNICIAN_REPOSITORY } from '../../core/repositories/technician.repository';
import { PrismaTechnicianRepository } from '../../infrastructure/prisma/repositories/prisma-technician.repository';
import { TechniciansController } from './technicians.controller';
import { GetManyTechnicianUseCase } from 'src/application/technician/usecases/get-many-technician.usecase';
import { GetTechnicianByIdUseCase } from 'src/application/technician/usecases/get-technician-by-id.usecase';
import { UpdateTechnicianUseCase } from 'src/application/technician/usecases/update-technician.usecase';
import { CreateTechnicianUseCase } from 'src/application/technician/usecases/create-technician.usecase';
import { DeleteTechnicianUseCase } from 'src/application/technician/usecases/delete-technician.usecase';

@Module({
  controllers: [TechniciansController],
  providers: [
    PrismaService,
    {
      provide: TECHNICIAN_REPOSITORY,
      useClass: PrismaTechnicianRepository,
    },
    GetManyTechnicianUseCase,
    GetTechnicianByIdUseCase,
    UpdateTechnicianUseCase,
    CreateTechnicianUseCase,
    DeleteTechnicianUseCase,
  ],
  exports: [
    GetManyTechnicianUseCase,
    GetTechnicianByIdUseCase,
    UpdateTechnicianUseCase,
    CreateTechnicianUseCase,
    DeleteTechnicianUseCase,
  ],
})
export class TechniciansHttpModule {}

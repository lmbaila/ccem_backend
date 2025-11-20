import { Module } from '@nestjs/common';
import { OriginController } from './orign.controller';
import { ORIGIN_REPOSITORY } from 'src/core/repositories/origin.repository';
import { OriginPrismaRepository } from 'src/infrastructure/prisma/repositories/prisma-origin.repository';
import { CreateOriginUseCase } from 'src/application/origin/usecases/create-origin.usecase';
import { UpdateOriginUseCase } from 'src/application/origin/usecases/update-origin.usecase';
import { DeleteOriginUseCase } from 'src/application/origin/usecases/delete-origin.usecase';
import { FindOriginUseCase } from 'src/application/origin/usecases/find-origin.usecase';
import { ListOriginUseCase } from 'src/application/origin/usecases/list-origin.usecase';

@Module({
  controllers: [OriginController],
  providers: [
    { provide: ORIGIN_REPOSITORY, useClass: OriginPrismaRepository },
    CreateOriginUseCase,
    UpdateOriginUseCase,
    DeleteOriginUseCase,
    FindOriginUseCase,
    ListOriginUseCase,
  ],
  exports: [],
})
export class OriginModule {}

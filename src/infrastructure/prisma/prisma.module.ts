import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaEventRepository } from './repositories/prisma-event.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { PrismaServiceRepository } from './repositories/prisma-service.repository';
import { PrismaTechnicianRepository } from './repositories/prisma-technician.repository';
import { PrismaFeedbackRepository } from './repositories/prisma-feedback.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaEventRepository,
    PrismaUserRepository,
    PrismaServiceRepository,
    PrismaTechnicianRepository,
    PrismaFeedbackRepository,
  ],
  exports: [
    PrismaService,
    PrismaEventRepository,
    PrismaUserRepository,
    PrismaServiceRepository,
    PrismaTechnicianRepository,
    PrismaFeedbackRepository,
  ],
})
export class PrismaModule {}

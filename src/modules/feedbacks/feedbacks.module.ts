import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FEEDBACK_REPOSITORY } from '../../core/repositories/feedback.repository';
import { PrismaFeedbackRepository } from '../../infrastructure/prisma/repositories/prisma-feedback.repository';

@Module({
  controllers: [FeedbacksController],
  providers: [{ provide: FEEDBACK_REPOSITORY, useExisting: PrismaFeedbackRepository }],
})
export class FeedbacksHttpModule {}

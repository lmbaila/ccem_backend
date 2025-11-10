import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IFeedbackRepository,
  DeleteFeedbackInput,
} from '../../../core/repositories/feedback.repository';

@Injectable()
export class PrismaFeedbackRepository implements IFeedbackRepository {
  constructor(private prisma: PrismaService) {}
  list() {
    return this.prisma.feedback.findMany({ include: { event: true, createdBy: true } });
  }
  create(data: any) {
    return this.prisma.feedback.create({ data });
  }
  update(id: number, data: any) {
    return this.prisma.feedback.update({ where: { id }, data });
  }
  async delete(input: DeleteFeedbackInput): Promise<any> {
    const { eventId, feedbackId, userId, userRole } = input;

    // 🔍 1. Verifica se o feedback existe
    const feedback = await this.prisma.feedback.findUnique({
      where: { id: feedbackId },
      select: { id: true, eventId: true, createdAt: true, createdById: true },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback não encontrado.');
    }

    // ⚠️ 2. Verifica se o feedback pertence ao evento informado
    if (feedback.eventId !== eventId) {
      throw new BadRequestException('O feedback informado não pertence ao evento especificado.');
    }

    // ⏱️ 3. Só pode remover se tiver menos de 1 hora desde a criação
    const diffInHours = (Date.now() - feedback.createdAt.getTime()) / (1000 * 60 * 60);
    if (diffInHours > 1) {
      throw new ForbiddenException(
        'O feedback só pode ser removido dentro de 1 hora após a criação.',
      );
    }

    // 👤 4. Verifica se o usuário autenticado é o dono OU ADMIN
    const isOwner = feedback.createdById === userId;
    const isAdmin = userRole === 'ADMIN';
    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'Apenas o criador do feedback ou um administrador pode removê-lo.',
      );
    }

    // 🗑️ 5. Remove feedback
    await this.prisma.feedback.delete({ where: { id: feedbackId } });

    return { message: 'Feedback removido com sucesso.' };
  }
}

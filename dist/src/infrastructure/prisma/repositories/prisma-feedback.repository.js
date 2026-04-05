"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFeedbackRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PrismaFeedbackRepository = class PrismaFeedbackRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list() {
        return this.prisma.feedback.findMany({ include: { event: true, createdBy: true } });
    }
    create(data) {
        return this.prisma.feedback.create({ data });
    }
    update(id, data) {
        return this.prisma.feedback.update({ where: { id }, data });
    }
    async delete(input) {
        const { eventId, feedbackId, userId, userRole } = input;
        const feedback = await this.prisma.feedback.findUnique({
            where: { id: feedbackId },
            select: { id: true, eventId: true, createdAt: true, createdById: true },
        });
        if (!feedback) {
            throw new common_1.NotFoundException('Feedback não encontrado.');
        }
        if (feedback.eventId !== eventId) {
            throw new common_1.BadRequestException('O feedback informado não pertence ao evento especificado.');
        }
        const diffInHours = (Date.now() - feedback.createdAt.getTime()) / (1000 * 60 * 60);
        if (diffInHours > 1) {
            throw new common_1.ForbiddenException('O feedback só pode ser removido dentro de 1 hora após a criação.');
        }
        const isOwner = feedback.createdById === userId;
        const isAdmin = userRole === 'ADMIN';
        if (!isOwner && !isAdmin) {
            throw new common_1.ForbiddenException('Apenas o criador do feedback ou um administrador pode removê-lo.');
        }
        await this.prisma.feedback.delete({ where: { id: feedbackId } });
        return { message: 'Feedback removido com sucesso.' };
    }
};
exports.PrismaFeedbackRepository = PrismaFeedbackRepository;
exports.PrismaFeedbackRepository = PrismaFeedbackRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaFeedbackRepository);
//# sourceMappingURL=prisma-feedback.repository.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("../../../core/repositories/event.repository");
const short_code_util_1 = require("../../../infrastructure/utils/short-code.util");
let CreateEventUseCase = class CreateEventUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(dto, userId) {
        var _a;
        const code = (0, short_code_util_1.generateShortCode)(8);
        if (dto.status === 'CANCELLED') {
            throw new common_1.BadRequestException({
                errorCode: 'EVENT_CANNOT_CREATE_CANCELLED',
                message: 'Nao pode criar eventos no estado cancelado.',
            });
        }
        const existing = await this.repo.findByTicket(dto.ticket);
        if (existing) {
            throw new common_1.BadRequestException({
                errorCode: 'EVENT_TICKET_DUPLICATE',
                message: 'Já existe um evento com este ticket.',
                existingEvent: existing,
            });
        }
        if (dto.status === 'COMPLETED') {
            const incomplete = dto.services.some((s) => !s.endAt);
            if (incomplete) {
                throw new common_1.BadRequestException({
                    errorCode: 'EVENT_SERVICE_NOT_RESTORED',
                    message: 'Nao e possivel concluir o evento: existe pelo menos um servico sem endAt.',
                });
            }
        }
        return this.repo.create({
            summary: dto.summary,
            description: dto.description,
            ticket: dto.ticket,
            dashboardId: dto.dashboardId,
            status: dto.status,
            priority: dto.priority,
            technicianIds: dto.technicianIds,
            originId: dto.originId,
            services: dto.services.map((s) => ({
                serviceId: s.serviceId,
                startAt: new Date(s.startAt),
                endAt: s.endAt ? new Date(s.endAt) : null,
            })),
            feedbacks: (_a = dto.feedbacks) !== null && _a !== void 0 ? _a : [],
            createdById: userId,
            code,
        });
    }
};
exports.CreateEventUseCase = CreateEventUseCase;
exports.CreateEventUseCase = CreateEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_repository_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateEventUseCase);
//# sourceMappingURL=create-event.usecase.js.map
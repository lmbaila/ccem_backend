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
exports.UpdateEventUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("../../../core/repositories/event.repository");
let UpdateEventUseCase = class UpdateEventUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, dto) {
        var _a, _b;
        const current = await this.repo.get(id);
        if (!current) {
            throw new common_1.BadRequestException({
                errorCode: 'EVENT_NOT_FOUND',
                message: 'Evento nao encontrado.',
            });
        }
        if (current.status === 'CANCELLED') {
            throw new common_1.BadRequestException({
                errorCode: 'EVENT_CANNOT_UPDATE_CANCELLED',
                message: 'Nao e possivel actualizar um evento cancelado.',
            });
        }
        if (dto.ticket && dto.ticket !== current.ticket) {
            const existing = await this.repo.findByTicket(dto.ticket);
            if (existing) {
                throw new common_1.BadRequestException({
                    errorCode: 'EVENT_TICKET_DUPLICATE',
                    message: 'Ja existe um evento com este ticket.',
                    existingEvent: existing,
                });
            }
        }
        if (dto.status === 'COMPLETED') {
            const event = await this.repo.get(id);
            const allServices = (_a = dto.services) !== null && _a !== void 0 ? _a : event.services.map((s) => ({
                serviceId: s.serviceId,
                startAt: s.startAt,
                endAt: s.endAt,
            }));
            const incomplete = allServices.some((s) => !s.endAt);
            if (incomplete) {
                throw new common_1.BadRequestException({
                    errorCode: 'EVENT_SERVICE_NOT_RESTORED',
                    message: 'Para concluir o evento, todos os serviços devem ter endAt definido.',
                });
            }
        }
        return this.repo.update(id, {
            summary: dto.summary,
            description: dto.description,
            ticket: dto.ticket,
            status: dto.status,
            priority: dto.priority,
            originId: dto.originId,
            technicianIds: dto.technicianIds,
            services: (_b = dto.services) === null || _b === void 0 ? void 0 : _b.map((s) => ({
                serviceId: s.serviceId,
                startAt: s.startAt ? new Date(s.startAt) : new Date(),
                endAt: s.endAt ? new Date(s.endAt) : null,
            })),
        });
    }
};
exports.UpdateEventUseCase = UpdateEventUseCase;
exports.UpdateEventUseCase = UpdateEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_repository_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateEventUseCase);
//# sourceMappingURL=update-event.usecase.js.map
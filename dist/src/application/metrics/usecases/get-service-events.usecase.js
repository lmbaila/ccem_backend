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
exports.GetServiceEventsUseCase = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
function parseMonthYear(value) {
    const [month, year] = value.split('/').map(Number);
    if (!month || !year)
        throw new common_1.BadRequestException(`Formato inválido: ${value}`);
    return new Date(year, month - 1, 1);
}
let GetServiceEventsUseCase = class GetServiceEventsUseCase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(dto) {
        var _a;
        const startDate = parseMonthYear(dto.startPeriod);
        const endDate = parseMonthYear(dto.endPeriod);
        endDate.setMonth(endDate.getMonth() + 1);
        if (endDate <= startDate) {
            throw new common_1.BadRequestException('O período final deve ser posterior ao inicial.');
        }
        if (!((_a = dto.services) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new common_1.BadRequestException('Deve informar ao menos um serviceId.');
        }
        const services = await this.prisma.service.findMany({
            where: { id: { in: dto.services } },
        });
        const results = await Promise.all(services.map(async (srv) => {
            const links = await this.prisma.eventService.findMany({
                where: {
                    serviceId: srv.id,
                    startAt: { gte: startDate, lt: endDate },
                },
                include: {
                    event: {
                        select: { id: true, code: true, summary: true },
                    },
                },
            });
            const events = links.map((link) => {
                var _a;
                const endAt = (_a = link.endAt) !== null && _a !== void 0 ? _a : new Date();
                const durationMinutes = Math.max((endAt.getTime() - link.startAt.getTime()) / (1000 * 60), 0);
                return {
                    eventId: link.event.id,
                    code: link.event.code,
                    summary: link.event.summary,
                    startAt: link.startAt,
                    endAt: link.endAt,
                    durationMinutes: Number(durationMinutes.toFixed(1)),
                };
            });
            const totalDowntime = events.reduce((sum, e) => sum + e.durationMinutes, 0);
            const totalPeriodMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
            const availability = totalPeriodMinutes > 0
                ? Number((((totalPeriodMinutes - totalDowntime) / totalPeriodMinutes) * 100).toFixed(2))
                : 100;
            return {
                serviceId: srv.id,
                serviceName: srv.name,
                totalEvents: events.length,
                totalDowntimeMinutes: Math.round(totalDowntime),
                availability,
                events,
            };
        }));
        const totalServices = results.length;
        const totalEvents = results.reduce((sum, s) => sum + s.totalEvents, 0);
        const totalDowntime = results.reduce((sum, s) => sum + s.totalDowntimeMinutes, 0);
        const avgAvailability = totalServices > 0
            ? Number((results.reduce((sum, s) => sum + s.availability, 0) / totalServices).toFixed(2))
            : 100;
        return {
            period: `${dto.startPeriod} - ${dto.endPeriod}`,
            totalServices,
            totalEvents,
            totalDowntimeMinutes: totalDowntime,
            averageAvailability: avgAvailability,
            generatedAt: new Date(),
            data: results,
        };
    }
};
exports.GetServiceEventsUseCase = GetServiceEventsUseCase;
exports.GetServiceEventsUseCase = GetServiceEventsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetServiceEventsUseCase);
//# sourceMappingURL=get-service-events.usecase.js.map
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
exports.GetUnavailableServicesUseCase = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const date_fns_1 = require("date-fns");
let GetUnavailableServicesUseCase = class GetUnavailableServicesUseCase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(range, filters) {
        const now = new Date();
        const { month, year } = filters || {};
        let from;
        let to;
        if (month && year) {
            from = (0, date_fns_1.startOfMonth)(new Date(year, month - 1, 1));
            to = (0, date_fns_1.endOfMonth)(from);
        }
        else {
            switch (range) {
                case 'weekly':
                    from = (0, date_fns_1.subWeeks)(now, 1);
                    break;
                case 'monthly':
                    from = (0, date_fns_1.subMonths)(now, 1);
                    break;
                case 'yearly':
                    from = (0, date_fns_1.subYears)(now, 1);
                    break;
                case 'daily':
                default:
                    from = (0, date_fns_1.subDays)(now, 1);
                    break;
            }
            to = now;
        }
        const activeEvents = await this.prisma.event.findMany({
            where: {
                status: { not: 'COMPLETED' },
                createdAt: { gte: from, lte: to },
            },
            include: {
                services: { include: { service: true } },
            },
        });
        if (activeEvents.length === 0) {
            return {
                range,
                month: month !== null && month !== void 0 ? month : null,
                year: year !== null && year !== void 0 ? year : null,
                generatedAt: now.toISOString(),
                totalUnavailable: 0,
                averageDowntimeMinutes: 0,
                servicesByMonth: [],
            };
        }
        const serviceStatsByMonth = {};
        for (const event of activeEvents) {
            for (const s of event.services) {
                const serviceId = s.serviceId;
                const serviceName = s.service.name;
                const start = new Date(s.startAt);
                const end = s.endAt ? new Date(s.endAt) : to;
                const downtimeMinutes = Math.max(Math.round((end.getTime() - start.getTime()) / 60000), 0);
                const m = start.getMonth() + 1;
                const y = start.getFullYear();
                const key = `${serviceId}-${m}-${y}`;
                if (!serviceStatsByMonth[key]) {
                    serviceStatsByMonth[key] = {
                        name: serviceName,
                        month: m,
                        year: y,
                        totalDowntime: 0,
                        incidents: 0,
                    };
                }
                serviceStatsByMonth[key].totalDowntime += downtimeMinutes;
                serviceStatsByMonth[key].incidents += 1;
            }
        }
        const results = Object.values(serviceStatsByMonth).map((s) => {
            const daysInMonth = new Date(s.year, s.month, 0).getDate();
            const totalPossibleMinutes = daysInMonth * 24 * 60;
            const uptimePercentage = Math.max(100 - (s.totalDowntime / totalPossibleMinutes) * 100, 0);
            return {
                service: s.name,
                month: s.month,
                year: s.year,
                incidents: s.incidents,
                downtimeMinutes: s.totalDowntime,
                uptimePercentage: Number(uptimePercentage.toFixed(2)),
            };
        });
        const sorted = results.sort((a, b) => b.downtimeMinutes - a.downtimeMinutes);
        const totalUnavailable = sorted.length;
        const avgDowntime = totalUnavailable > 0
            ? Math.round(sorted.reduce((acc, s) => acc + s.downtimeMinutes, 0) / totalUnavailable)
            : 0;
        return {
            range,
            month: month !== null && month !== void 0 ? month : null,
            year: year !== null && year !== void 0 ? year : null,
            generatedAt: now.toISOString(),
            totalUnavailable,
            averageDowntimeMinutes: avgDowntime,
            servicesByMonth: sorted,
        };
    }
};
exports.GetUnavailableServicesUseCase = GetUnavailableServicesUseCase;
exports.GetUnavailableServicesUseCase = GetUnavailableServicesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetUnavailableServicesUseCase);
//# sourceMappingURL=get-unavailable-services.usecase.js.map
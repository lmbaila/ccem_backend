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
exports.PrismaMetricsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const date_range_util_1 = require("../../utils/date-range.util");
const date_fns_1 = require("date-fns");
function parseMonthYear(value) {
    const [month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, 1);
}
let PrismaMetricsRepository = class PrismaMetricsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview(range) {
        const since = (0, date_range_util_1.getDateFromRange)(range);
        const [total, active, completed, feedbackCount, positiveFeedback] = await Promise.all([
            this.prisma.event.count({
                where: { createdAt: { gte: since }, status: { not: 'CANCELLED' } },
            }),
            this.prisma.event.count({
                where: {
                    createdAt: { gte: since },
                    status: { in: ['PENDING', 'IN_PROGRESS'] },
                },
            }),
            this.prisma.event.count({
                where: { createdAt: { gte: since }, status: 'COMPLETED' },
            }),
            this.prisma.feedback.count({
                where: {
                    createdAt: { gte: since },
                    event: { status: { not: 'CANCELLED' } },
                },
            }),
            this.prisma.feedback.count({
                where: {
                    createdAt: { gte: since },
                    rating: { gte: 4 },
                    event: { status: { not: 'CANCELLED' } },
                },
            }),
        ]);
        const links = await this.prisma.eventService.findMany({
            where: {
                event: { createdAt: { gte: since }, status: { not: 'CANCELLED' } },
                endAt: { not: null },
            },
            select: { startAt: true, endAt: true },
        });
        const mttrMs = links.length === 0
            ? 0
            : links.reduce((acc, l) => acc + (new Date(l.endAt).getTime() - new Date(l.startAt).getTime()), 0) / links.length;
        const periodMs = Date.now() - since.getTime();
        const totalDowntimeMs = await this.totalDowntimeInRangeMs(since);
        const avgAvailability = periodMs > 0 ? Math.max(0, 100 - (totalDowntimeMs / periodMs) * 100) : 100;
        return {
            range,
            totalEvents: total,
            activeEvents: active,
            resolvedEvents: completed,
            totalFeedbacks: feedbackCount,
            positiveFeedbackPercent: feedbackCount
                ? Math.round((positiveFeedback / feedbackCount) * 100)
                : 0,
            averageResolutionTimeMs: Math.round(mttrMs),
            averageResolutionTimeHuman: (0, date_range_util_1.formatDurationHuman)(mttrMs),
            averageAvailabilityPercent: Number(avgAvailability.toFixed(2)),
            generatedAt: new Date().toISOString(),
        };
    }
    async topImpactedServices(range) {
        const since = (0, date_range_util_1.getDateFromRange)(range);
        const services = await this.prisma.service.findMany({
            include: {
                eventLinks: {
                    where: {
                        event: { createdAt: { gte: since }, status: { not: 'CANCELLED' } },
                    },
                    select: { startAt: true, endAt: true },
                },
            },
        });
        const data = services
            .map((s) => {
            const totalMs = s.eventLinks.reduce((acc, e) => {
                const start = new Date(e.startAt).getTime();
                const end = e.endAt ? new Date(e.endAt).getTime() : Date.now();
                return acc + Math.max(end - start, 0);
            }, 0);
            return {
                service: s.name,
                incidents: s.eventLinks.length,
                totalDowntimeMinutes: Math.round(totalMs / 60000),
                totalDowntimeHuman: (0, date_range_util_1.formatDurationHuman)(totalMs),
            };
        })
            .filter((x) => x.incidents > 0)
            .sort((a, b) => b.totalDowntimeMinutes - a.totalDowntimeMinutes)
            .slice(0, 10);
        return { range, generatedAt: new Date().toISOString(), topImpactedServices: data };
    }
    async unavailableServicesNow() {
        const links = await this.prisma.eventService.findMany({
            where: {
                endAt: null,
                event: { status: { in: ['PENDING', 'IN_PROGRESS'] } },
            },
            select: {
                startAt: true,
                event: { select: { id: true, code: true, status: true, priority: true } },
                service: { select: { id: true, name: true, description: true } },
            },
        });
        return {
            timestamp: new Date().toISOString(),
            unavailableServices: links.map((l) => ({
                serviceId: l.service.id,
                service: l.service.name,
                eventCode: l.event.code,
                priority: l.event.priority,
                status: l.event.status,
                since: l.startAt,
                durationHuman: (0, date_range_util_1.formatDurationHuman)(Date.now() - new Date(l.startAt).getTime()),
            })),
        };
    }
    async liveFeedbacks(limit = 20) {
        const items = await this.prisma.feedback.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                event: { select: { code: true, summary: true } },
                createdBy: { select: { username: true } },
            },
            where: {
                event: { status: { not: 'CANCELLED' } },
            },
        });
        return {
            recentFeedbacks: items.map((f) => ({
                eventCode: f.event.code,
                eventSummary: f.event.summary,
                comment: f.comment,
                rating: f.rating,
                author: f.createdBy.username,
                createdAt: f.createdAt,
            })),
        };
    }
    async eventsByDashboard(range) {
        const since = (0, date_range_util_1.getDateFromRange)(range);
        const dashboards = await this.prisma.dashboard.findMany({
            include: {
                Event: {
                    where: { createdAt: { gte: since }, status: { not: 'CANCELLED' } },
                    select: { id: true, status: true, priority: true },
                },
            },
        });
        const totalEvents = dashboards.reduce((acc, d) => acc + d.Event.length, 0);
        return {
            range,
            totalEvents,
            dashboards: dashboards
                .map((d) => ({
                name: d.name,
                events: d.Event.length,
                active: d.Event.filter((e) => e.status !== 'COMPLETED').length,
                completed: d.Event.filter((e) => e.status === 'COMPLETED').length,
                critical: d.Event.filter((e) => e.priority === 'CRITICAL').length,
            }))
                .sort((a, b) => b.events - a.events),
        };
    }
    async timeline(range) {
        const since = (0, date_range_util_1.getDateFromRange)(range);
        const events = await this.prisma.event.findMany({
            where: { createdAt: { gte: since }, status: { not: 'CANCELLED' } },
            select: { createdAt: true, status: true, updatedAt: true },
            orderBy: { createdAt: 'asc' },
        });
        const buckets = new Map();
        const useHour = range === 'daily' || range === 'weekly';
        const keyOf = (d) => useHour
            ? `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:00`
            : `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
        for (const e of events) {
            const kc = keyOf(new Date(e.createdAt));
            if (!buckets.has(kc))
                buckets.set(kc, { created: 0, completed: 0 });
            buckets.get(kc).created++;
            if (e.status === 'COMPLETED') {
                const ku = keyOf(new Date(e.updatedAt));
                if (!buckets.has(ku))
                    buckets.set(ku, { created: 0, completed: 0 });
                buckets.get(ku).completed++;
            }
        }
        const labels = Array.from(buckets.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        return {
            range,
            labels,
            createdEvents: labels.map((k) => buckets.get(k).created),
            resolvedEvents: labels.map((k) => buckets.get(k).completed),
        };
    }
    async totalDowntimeInRangeMs(since) {
        const links = await this.prisma.eventService.findMany({
            where: {
                event: { createdAt: { gte: since }, status: { not: 'CANCELLED' } },
            },
            select: { startAt: true, endAt: true },
        });
        return links.reduce((acc, l) => {
            const start = new Date(l.startAt).getTime();
            const end = l.endAt ? new Date(l.endAt).getTime() : Date.now();
            return acc + Math.max(end - start, 0);
        }, 0);
    }
    async getServiceAvailability(input) {
        const { services = [], startPeriod, endPeriod, target = 99 } = input;
        const startDate = parseMonthYear(startPeriod);
        const endDate = parseMonthYear(endPeriod);
        if ((0, date_fns_1.isAfter)(startDate, endDate)) {
            throw new common_1.BadRequestException('O período final deve ser posterior ao inicial.');
        }
        const months = [];
        let current = startDate;
        while (!(0, date_fns_1.isAfter)(current, endDate)) {
            months.push({
                label: `${(0, date_fns_1.format)(current, 'MMM')}/${(0, date_fns_1.format)(current, 'yy')}`,
                start: current,
                end: (0, date_fns_1.addMonths)(current, 1),
            });
            current = (0, date_fns_1.addMonths)(current, 1);
        }
        const selectedServices = services.length
            ? await this.prisma.service.findMany({ where: { id: { in: services } } })
            : await this.prisma.service.findMany();
        if (!selectedServices.length) {
            throw new common_1.BadRequestException('Nenhum serviço encontrado.');
        }
        const result = await Promise.all(selectedServices.map(async (srv) => {
            const monthly = await Promise.all(months.map(async (m) => {
                const events = await this.prisma.eventService.findMany({
                    where: {
                        serviceId: srv.id,
                        startAt: { gte: m.start, lt: m.end },
                        event: { status: { not: 'CANCELLED' } },
                    },
                });
                const totalMinutes = 30 * 24 * 60;
                const downtimeMinutes = events.reduce((acc, e) => {
                    const start = new Date(e.startAt).getTime();
                    const end = e.endAt ? new Date(e.endAt).getTime() : start;
                    return acc + Math.max((end - start) / 60000, 0);
                }, 0);
                const uptimeMinutes = totalMinutes - downtimeMinutes;
                const availabilityPercent = (uptimeMinutes / totalMinutes) * 100;
                return {
                    month: m.label,
                    uptimeMinutes,
                    downtimeMinutes,
                    availabilityPercent: Number(availabilityPercent.toFixed(2)),
                    incidents: events.length,
                };
            }));
            const avgAvailability = monthly.reduce((acc, m) => acc + m.availabilityPercent, 0) / monthly.length;
            return {
                serviceId: srv.id,
                serviceName: srv.name,
                averageAvailability: Number(avgAvailability.toFixed(2)),
                data: monthly,
            };
        }));
        return {
            period: `${startPeriod} - ${endPeriod}`,
            target,
            totalServices: result.length,
            generatedAt: new Date(),
            result,
        };
    }
};
exports.PrismaMetricsRepository = PrismaMetricsRepository;
exports.PrismaMetricsRepository = PrismaMetricsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMetricsRepository);
//# sourceMappingURL=prisma-metrics.repository.js.map
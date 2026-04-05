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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEventRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PrismaEventRepository = class PrismaEventRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(params) {
        const { search, status, priority, startDate, endDate, skip = 0, take = 10 } = params;
        const whereClause = {
            AND: [
                status ? { status } : {},
                priority ? { priority } : {},
                startDate || endDate
                    ? {
                        createdAt: Object.assign(Object.assign({}, (startDate ? { gte: new Date(startDate) } : {})), (endDate ? { lte: new Date(endDate) } : {})),
                    }
                    : {},
                search
                    ? {
                        OR: [
                            { summary: { contains: search, mode: 'insensitive' } },
                            { description: { contains: search, mode: 'insensitive' } },
                            { code: { contains: search, mode: 'insensitive' } },
                            { ticket: { contains: search, mode: 'insensitive' } },
                        ],
                    }
                    : {},
            ],
        };
        return this.prisma.event.findMany({
            where: whereClause,
            include: {
                services: { include: { service: true } },
                technicians: { include: { technician: true } },
                feedbacks: { include: { createdBy: true } },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take,
        });
    }
    count(params) {
        const { search, status, priority, startDate, endDate } = params;
        const whereClause = {
            AND: [
                status ? { status } : {},
                priority ? { priority } : {},
                startDate || endDate
                    ? {
                        createdAt: Object.assign(Object.assign({}, (startDate ? { gte: new Date(startDate) } : {})), (endDate ? { lte: new Date(endDate) } : {})),
                    }
                    : {},
                search
                    ? {
                        OR: [
                            { summary: { contains: search, mode: 'insensitive' } },
                            { description: { contains: search, mode: 'insensitive' } },
                            { code: { contains: search, mode: 'insensitive' } },
                            { ticket: { contains: search, mode: 'insensitive' } },
                        ],
                    }
                    : {},
            ],
        };
        return this.prisma.event.count({ where: whereClause });
    }
    get(id) {
        return this.prisma.event.findUnique({
            where: { id },
            include: {
                services: { include: { service: true } },
                technicians: { include: { technician: true } },
                feedbacks: { include: { createdBy: true } },
            },
        });
    }
    async create(input) {
        const { services, technicianIds = [], feedbacks = [], code, createdById } = input, rest = __rest(input, ["services", "technicianIds", "feedbacks", "code", "createdById"]);
        if (!(services === null || services === void 0 ? void 0 : services.length)) {
            throw new common_1.BadRequestException('Pelo menos um serviço impactado deve ser informado.');
        }
        const formattedServices = services.map((s, index) => {
            if (!s.serviceId) {
                throw new common_1.BadRequestException(`serviceId ausente no serviço #${index + 1}`);
            }
            const start = new Date(s.startAt);
            if (isNaN(start.getTime())) {
                throw new common_1.BadRequestException(`Data inválida em startAt (serviço #${index + 1})`);
            }
            const end = s.endAt && !isNaN(new Date(s.endAt).getTime()) ? new Date(s.endAt) : null;
            return {
                service: { connect: { id: s.serviceId } },
                startAt: start,
                endAt: end,
            };
        });
        return this.prisma.$transaction(async (tx) => {
            const event = await tx.event.create({
                data: Object.assign(Object.assign({}, rest), { code,
                    createdById, services: { create: formattedServices }, technicians: {
                        create: technicianIds.map((id) => ({
                            technician: { connect: { id } },
                        })),
                    } }),
                include: {
                    services: { include: { service: true } },
                    technicians: { include: { technician: true } },
                },
            });
            let createdFeedbacks = [];
            if (feedbacks.length > 0) {
                createdFeedbacks = await Promise.all(feedbacks.map((f) => {
                    var _a;
                    return tx.feedback.create({
                        data: {
                            comment: f.comment.trim(),
                            rating: (_a = f.rating) !== null && _a !== void 0 ? _a : null,
                            eventId: event.id,
                            createdById,
                        },
                    });
                }));
            }
            return Object.assign(Object.assign({}, event), { feedbacks: createdFeedbacks });
        });
    }
    async update(id, input, userId) {
        const { services, technicianIds, feedbacks = [] } = input, rest = __rest(input, ["services", "technicianIds", "feedbacks"]);
        return this.prisma.$transaction(async (tx) => {
            if (Array.isArray(services)) {
                await tx.eventService.deleteMany({ where: { eventId: id } });
                if (services.length) {
                    await tx.eventService.createMany({
                        data: services.map((s) => {
                            var _a;
                            return ({
                                eventId: id,
                                serviceId: s.serviceId,
                                startAt: s.startAt,
                                endAt: (_a = s.endAt) !== null && _a !== void 0 ? _a : null,
                            });
                        }),
                    });
                }
            }
            if (Array.isArray(technicianIds)) {
                await tx.eventTechnician.deleteMany({ where: { eventId: id } });
                if (technicianIds.length) {
                    await tx.eventTechnician.createMany({
                        data: technicianIds.map((tid) => ({
                            eventId: id,
                            technicianId: tid,
                        })),
                    });
                }
            }
            if (feedbacks.length > 0) {
                await Promise.all(feedbacks.map((f) => {
                    var _a;
                    return tx.feedback.create({
                        data: {
                            comment: f.comment.trim(),
                            rating: (_a = f.rating) !== null && _a !== void 0 ? _a : null,
                            eventId: id,
                            createdById: userId !== null && userId !== void 0 ? userId : 1,
                        },
                    });
                }));
            }
            if (rest.status === 'CANCELLED') {
                const timestamp = Date.now();
                rest.ticket = `${rest.ticket}_cancelled_${timestamp}`;
            }
            return tx.event.update({
                where: { id },
                data: Object.assign({}, rest),
                include: {
                    services: { include: { service: true } },
                    technicians: { include: { technician: true } },
                    feedbacks: { include: { createdBy: true } },
                },
            });
        });
    }
    delete(id) {
        return this.prisma.event.delete({ where: { id } });
    }
    getByCode(code) {
        return this.prisma.event.findUnique({
            where: { code },
            include: {
                services: { include: { service: true } },
                technicians: { include: { technician: true } },
                feedbacks: { include: { createdBy: true } },
            },
        });
    }
    async findByTicket(ticket) {
        return this.prisma.event.findFirst({
            where: { ticket },
            include: {
                services: { include: { service: true } },
                technicians: { include: { technician: true } },
                feedbacks: true,
                dashboard: true,
                createdBy: true,
            },
        });
    }
};
exports.PrismaEventRepository = PrismaEventRepository;
exports.PrismaEventRepository = PrismaEventRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEventRepository);
//# sourceMappingURL=prisma-event.repository.js.map
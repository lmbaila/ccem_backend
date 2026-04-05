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
exports.OriginPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let OriginPrismaRepository = class OriginPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.origin.create({ data });
    }
    update(id, data) {
        return this.prisma.origin.update({
            where: { id },
            data,
        });
    }
    delete(id) {
        return this.prisma.origin.delete({ where: { id } });
    }
    findOne(id) {
        return this.prisma.origin.findUnique({ where: { id } });
    }
    findByName(name) {
        return this.prisma.origin.findUnique({
            where: { name },
        });
    }
    async list(search, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                name: {
                    contains: search,
                    mode: client_1.Prisma.QueryMode.insensitive,
                },
            }
            : {};
        const [data, total] = await Promise.all([
            this.prisma.origin.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            this.prisma.origin.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
};
exports.OriginPrismaRepository = OriginPrismaRepository;
exports.OriginPrismaRepository = OriginPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OriginPrismaRepository);
//# sourceMappingURL=prisma-origin.repository.js.map
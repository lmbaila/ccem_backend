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
exports.PrismaServiceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let PrismaServiceRepository = class PrismaServiceRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list({ search, page = 1, limit = 10 }) {
        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { description: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                ],
            }
            : {};
        const [data, total] = await Promise.all([
            this.prisma.service.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            this.prisma.service.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async create(input) {
        const name = input.name.trim();
        const exists = await this.prisma.service.findUnique({ where: { name } });
        if (exists) {
            throw new common_1.BadRequestException(`Ja existe um servico com o nome "${name}".`);
        }
        return this.prisma.service.create({
            data: {
                name,
                description: input.description.trim(),
            },
        });
    }
    async update(id, input) {
        var _a, _b, _c;
        const existing = await this.prisma.service.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Servico nao encontrado.');
        const name = (_a = input.name) === null || _a === void 0 ? void 0 : _a.trim();
        if (name && name !== existing.name) {
            const duplicate = await this.prisma.service.findUnique({ where: { name } });
            if (duplicate) {
                throw new common_1.BadRequestException(`Ja existe outro servico com o nome "${name}".`);
            }
        }
        return this.prisma.service.update({
            where: { id },
            data: {
                name: name !== null && name !== void 0 ? name : existing.name,
                description: (_c = (_b = input.description) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : existing.description,
            },
        });
    }
    async get(id) {
        const service = await this.prisma.service.findUnique({ where: { id } });
        if (!service)
            throw new common_1.NotFoundException('Servico nao encontrado.');
        return service;
    }
    async delete(id) {
        const exists = await this.prisma.service.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.NotFoundException('Servico nao encontrado.');
        await this.prisma.service.delete({ where: { id } });
        return { message: 'Servico removido com sucesso.' };
    }
};
exports.PrismaServiceRepository = PrismaServiceRepository;
exports.PrismaServiceRepository = PrismaServiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaServiceRepository);
//# sourceMappingURL=prisma-service.repository.js.map
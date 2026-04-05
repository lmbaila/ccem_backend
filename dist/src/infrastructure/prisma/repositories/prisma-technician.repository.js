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
exports.PrismaTechnicianRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PrismaTechnicianRepository = class PrismaTechnicianRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(params) {
        const { search, page = 1, limit = 10 } = params;
        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { code: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const total = await this.prisma.technician.count({ where });
        const data = await this.prisma.technician.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { id: 'desc' },
            include: { team: true },
        });
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async create(input) {
        const { name, email, code, teamId } = input;
        const duplicate = await this.prisma.technician.findFirst({
            where: { OR: [{ email }, { code }] },
        });
        if (duplicate)
            throw new common_1.BadRequestException('Já existe um técnico com este email ou código.');
        return this.prisma.technician.create({
            data: {
                name,
                email,
                code,
                team: { connect: { id: teamId } },
            },
            include: {
                team: true,
            },
        });
    }
    async update(id, input) {
        var _a, _b, _c, _d, _e, _f;
        const existing = await this.prisma.technician.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Tecnico nao encontrado.');
        const team = await this.prisma.team.findUnique({ where: { id: input.teamId } });
        if (!team)
            throw new common_1.BadRequestException(`A equipa com ID ${input.teamId} nao existe.`);
        const conditions = [];
        if (input.email)
            conditions.push({ email: input.email });
        if (input.code)
            conditions.push({ code: input.code });
        const duplicate = await this.prisma.technician.findFirst({
            where: {
                OR: conditions.length > 0 ? conditions : undefined,
                NOT: { id },
            },
        });
        if (duplicate)
            throw new common_1.BadRequestException('Ja existe outro tecnico com este email ou codigo.');
        return this.prisma.technician.update({
            where: { id },
            data: {
                name: (_b = (_a = input.name) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : existing.name,
                code: (_d = (_c = input.code) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : existing.code,
                email: (_f = (_e = input.email) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : existing.email,
                teamId: input.teamId,
            },
            include: { team: true },
        });
    }
    async get(id) {
        const tech = await this.prisma.technician.findUnique({
            where: { id },
            include: { team: true },
        });
        if (!tech)
            throw new common_1.NotFoundException('Tecnico nao encontrado.');
        return tech;
    }
    async delete(id) {
        const technician = await this.prisma.technician.findUnique({
            where: { id },
            include: { eventLinks: true },
        });
        if (!technician)
            throw new common_1.NotFoundException('Tecnico nao encontrado.');
        if (technician.eventLinks.length > 0) {
            throw new common_1.BadRequestException('Nao e possivel deletar o tecnico, pois ele esta associado a um ou mais eventos.');
        }
        await this.prisma.technician.delete({ where: { id } });
        return { message: `Tecnico ${technician.name} removido com sucesso.` };
    }
};
exports.PrismaTechnicianRepository = PrismaTechnicianRepository;
exports.PrismaTechnicianRepository = PrismaTechnicianRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTechnicianRepository);
//# sourceMappingURL=prisma-technician.repository.js.map
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
exports.PrismaTeamRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let PrismaTeamRepository = class PrismaTeamRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(input) {
        const { search, page = 1, limit = 10 } = input;
        const skip = (page - 1) * limit;
        const where = search
            ? {
                name: {
                    contains: search,
                    mode: client_1.Prisma.QueryMode.insensitive,
                },
            }
            : {};
        const [teams, totalTeams, totalTechnicians] = await Promise.all([
            this.prisma.team.findMany({
                where,
                skip,
                take: limit,
                include: {
                    techs: true,
                },
                orderBy: { name: 'asc' },
            }),
            this.prisma.team.count({ where }),
            this.prisma.technician.count(),
        ]);
        const teamsWithCount = teams.map((t) => ({
            id: t.id,
            name: t.name,
            totalTechnicians: t.techs.length,
        }));
        const totalTechsInListed = teamsWithCount.reduce((sum, t) => sum + t.totalTechnicians, 0);
        const avgTechsPerTeam = totalTeams > 0 ? totalTechsInListed / totalTeams : 0;
        const largestTeam = teamsWithCount.reduce((max, team) => (team.totalTechnicians > max.totalTechnicians ? team : max), { id: 0, name: '', totalTechnicians: 0 });
        return {
            pagination: {
                totalTeams,
                page,
                limit,
                totalPages: Math.ceil(totalTeams / limit),
            },
            metrics: {
                totalTeams,
                totalTechnicians,
                avgTechniciansPerTeam: avgTechsPerTeam,
                largestTeam,
            },
            data: teamsWithCount,
        };
    }
    async findByName(name) {
        return this.prisma.team.findUnique({ where: { name } });
    }
    async create(data) {
        return this.prisma.team.create({ data });
    }
    findById(id) {
        return this.prisma.team.findUnique({ where: { id } });
    }
    update(id, data) {
        return this.prisma.team.update({
            where: { id },
            data,
        });
    }
};
exports.PrismaTeamRepository = PrismaTeamRepository;
exports.PrismaTeamRepository = PrismaTeamRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTeamRepository);
//# sourceMappingURL=prisma-team.repository.js.map
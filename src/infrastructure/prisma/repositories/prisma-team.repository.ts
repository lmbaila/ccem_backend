import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITeamRepository, GetManyTeamInput } from '../../../core/repositories/team.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaTeamRepository implements ITeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(input: GetManyTeamInput) {
    const { search, page = 1, limit = 10 } = input;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
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

    const largestTeam = teamsWithCount.reduce(
      (max, team) => (team.totalTechnicians > max.totalTechnicians ? team : max),
      { id: 0, name: '', totalTechnicians: 0 },
    );

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
  async findByName(name: string) {
    return this.prisma.team.findUnique({ where: { name } });
  }

  async create(data: { name: string }) {
    return this.prisma.team.create({ data });
  }
  findById(id: number) {
    return this.prisma.team.findUnique({ where: { id } });
  }

  update(id: number, data: { name: string }) {
    return this.prisma.team.update({
      where: { id },
      data,
    });
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  ITechnicianRepository,
  TechnicianQueryParams,
  CreateTechnicianInput,
  UpdateTechnicianInput,
} from '../../../core/repositories/technician.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaTechnicianRepository implements ITechnicianRepository {
  constructor(private prisma: PrismaService) {}
  async list(params: TechnicianQueryParams) {
    const { search, page = 1, limit = 10 } = params;

    const where: Prisma.TechnicianWhereInput = search
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
  async create(input: CreateTechnicianInput) {
    const { name, email, code, teamId } = input;

    // ✅ verificar duplicados por email ou código
    const duplicate = await this.prisma.technician.findFirst({
      where: { OR: [{ email }, { code }] },
    });

    if (duplicate) throw new BadRequestException('Já existe um técnico com este email ou código.');

    // ✅ criar novo técnico, sem ID manual
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

  async update(id: number, input: UpdateTechnicianInput) {
    const existing = await this.prisma.technician.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Tecnico nao encontrado.');

    const team = await this.prisma.team.findUnique({ where: { id: input.teamId } });
    if (!team) throw new BadRequestException(`A equipa com ID ${input.teamId} nao existe.`);

    const conditions: Prisma.TechnicianWhereInput[] = [];
    if (input.email) conditions.push({ email: input.email });
    if (input.code) conditions.push({ code: input.code });

    const duplicate = await this.prisma.technician.findFirst({
      where: {
        OR: conditions.length > 0 ? conditions : undefined,
        NOT: { id },
      },
    });
    if (duplicate)
      throw new BadRequestException('Ja existe outro tecnico com este email ou codigo.');

    return this.prisma.technician.update({
      where: { id },
      data: {
        name: input.name?.trim() ?? existing.name,
        code: input.code?.trim() ?? existing.code,
        email: input.email?.trim() ?? existing.email,
        teamId: input.teamId,
      },
      include: { team: true },
    });
  }

  async get(id: number) {
    const tech = await this.prisma.technician.findUnique({
      where: { id },
      include: { team: true },
    });
    if (!tech) throw new NotFoundException('Tecnico nao encontrado.');
    return tech;
  }

  async delete(id: number) {
    const technician = await this.prisma.technician.findUnique({
      where: { id },
      include: { eventLinks: true },
    });

    if (!technician) throw new NotFoundException('Tecnico nao encontrado.');

    if (technician.eventLinks.length > 0) {
      throw new BadRequestException(
        'Nao e possivel deletar o tecnico, pois ele esta associado a um ou mais eventos.',
      );
    }

    await this.prisma.technician.delete({ where: { id } });
    return { message: `Tecnico ${technician.name} removido com sucesso.` };
  }
}

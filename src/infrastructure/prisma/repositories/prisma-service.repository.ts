import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IServiceRepository,
  GetManyServiceParams,
  type CreateServiceInput,
  type UpdateServiceInput,
} from '../../../core/repositories/service.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaServiceRepository implements IServiceRepository {
  constructor(private prisma: PrismaService) {}
  async list({ search, page = 1, limit = 10 }: GetManyServiceParams) {
    const where: Prisma.ServiceWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
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
  async create(input: CreateServiceInput) {
    const name = input.name.trim();

    const exists = await this.prisma.service.findUnique({ where: { name } });
    if (exists) {
      throw new BadRequestException(`Ja existe um servico com o nome "${name}".`);
    }

    return this.prisma.service.create({
      data: {
        name,
        description: input.description.trim(),
      },
    });
  }

  async update(id: number, input: UpdateServiceInput) {
    const existing = await this.prisma.service.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Servico nao encontrado.');

    const name = input.name?.trim();

    if (name && name !== existing.name) {
      const duplicate = await this.prisma.service.findUnique({ where: { name } });
      if (duplicate) {
        throw new BadRequestException(`Ja existe outro servico com o nome "${name}".`);
      }
    }

    return this.prisma.service.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        description: input.description?.trim() ?? existing.description,
      },
    });
  }
  async get(id: number) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Servico nao encontrado.');
    return service;
  }

  async delete(id: number) {
    const exists = await this.prisma.service.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Servico nao encontrado.');
    await this.prisma.service.delete({ where: { id } });
    return { message: 'Servico removido com sucesso.' };
  }
}

import { Injectable } from '@nestjs/common';
import { IOriginRepository } from 'src/core/repositories/origin.repository';
import { PrismaService } from '../prisma.service';
import { CreateOriginDto } from 'src/application/origin/dto/create-origin.dto';
import { UpdateOriginDto } from 'src/application/origin/dto/update-origin.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OriginPrismaRepository implements IOriginRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateOriginDto) {
    return this.prisma.origin.create({ data });
  }

  update(id: number, data: UpdateOriginDto) {
    return this.prisma.origin.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.origin.delete({ where: { id } });
  }

  findOne(id: number) {
    return this.prisma.origin.findUnique({ where: { id } });
  }

  findByName(name: string) {
    return this.prisma.origin.findUnique({
      where: { name },
    });
  }

  async list(search?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where: Prisma.OriginWhereInput = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
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
}

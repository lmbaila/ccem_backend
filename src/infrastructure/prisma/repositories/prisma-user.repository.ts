import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateUserInput,
  IUserRepository,
  ListUsersParams,
} from '../../../core/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}
  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async list(params: ListUsersParams = {}) {
    // Converte page e limit em números (ou usa valores padrão)
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const search = params.search;
    const role = params.role;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { username: { contains: search, mode: 'insensitive' } },
        { firstname: { contains: search, mode: 'insensitive' } },
        { lastname: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit, // <— aqui o Prisma precisa de um número válido
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  create(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }
  update(id: number, data: Partial<CreateUserInput>) {
    return this.prisma.user.update({ where: { id }, data });
  }
  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

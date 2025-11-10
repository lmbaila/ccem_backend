import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository, USER_REPOSITORY } from '../../core/repositories/user.repository';
import { GetManyUsersDto } from './dto/get-many-users.dto';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(@Inject(USER_REPOSITORY) private users: IUserRepository) {}

  @Get()
  @ApiOperation({ summary: 'Lista utilizadores com paginacao e pesquisa' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'role', required: false, enum: ['ADMIN', 'COMMANDCENTRE', 'VIEWER'] })
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('role') role?: 'ADMIN' | 'COMMANDCENTRE' | 'VIEWER',
  ) {
    return this.users.list({ page, limit, search, role });
  }

  @Get(':id') @ApiOperation({ summary: 'Detalhe utilizador' }) get(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.users.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria utilizador' })
  async create(@Body() dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.users.create({ ...dto, password: hashed });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza utilizador' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    const data: any = { ...dto };
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);
    return this.users.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove utilizador' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.users.delete(id);
  }
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from 'src/core/enums/role.enum';

export class GetManyUsersDto {
  @ApiPropertyOptional({ description: 'Numero da pagina', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Quantidade de itens por pagina', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Termo de pesquisa (username, firstname, lastname ou email)',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por Role',
    enum: Role,
    example: Role.ADMIN,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

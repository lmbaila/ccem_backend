import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsDateString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetEventsQueryDto {
  @ApiPropertyOptional({
    description: 'Texto de pesquisa (summary, description, code ou ticket)',
    example: 'indisponivel',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
    description: 'Filtrar eventos por status',
  })
  @IsOptional()
  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const)
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

  @ApiPropertyOptional({
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    description: 'Filtrar eventos por prioridade',
  })
  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const)
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  @ApiPropertyOptional({
    example: '2025-11-01T00:00:00Z',
    description: 'Filtrar eventos criados a partir desta data',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2025-11-06T23:59:59Z',
    description: 'Filtrar eventos criados até esta data',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 1, description: 'Número da página' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Itens por página' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 10;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, IsString } from 'class-validator';

export class GetManyServiceDto {
  @ApiPropertyOptional({
    description: 'Texto para pesquisa por nome ou descrição do serviço',
    example: 'EMOLA',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Número da página (mínimo 1)',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer number' })
  @Min(1, { message: 'page must not be less than 1' })
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Número de registros por página (mínimo 1)',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer number' })
  @Min(1, { message: 'limit must not be less than 1' })
  limit: number = 10;
}

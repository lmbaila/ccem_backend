import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListOriginDto {
  @ApiPropertyOptional({
    example: 'net',
    description: 'Filtro por nome (opcional)',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: '1',
    description: 'Numero da pagina para paginacao (opcional)',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    example: '10',
    description: 'Limite de itens por pagina (opcional)',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}

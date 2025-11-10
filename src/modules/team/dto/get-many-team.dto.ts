import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetManyTeamDto {
  @ApiPropertyOptional({
    example: 'Infraestrutura',
    description: 'Filtra pelo nome da equipa (pesquisa parcial e insensivel a maiusculas).',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Pagina atual (deve ser >= 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page deve ser um numero inteiro' })
  @Min(1, { message: 'page deve ser maior ou igual a 1' })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Numero de resultados por pagina (deve ser >= 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit deve ser um numero inteiro' })
  @Min(1, { message: 'limit deve ser maior ou igual a 1' })
  limit: number = 10;
}

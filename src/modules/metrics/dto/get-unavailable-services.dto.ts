import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min, Max } from 'class-validator';

export type MetricsRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

export class GetUnavailableServicesDto {
  @ApiPropertyOptional({
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    example: 'monthly',
    description: 'Intervalo de tempo (daily, weekly, monthly, yearly)',
  })
  @IsOptional()
  @IsEnum(['daily', 'weekly', 'monthly', 'yearly'])
  range?: MetricsRange;

  @ApiPropertyOptional({
    example: 11,
    minimum: 1,
    maximum: 12,
    description: 'Número do mês (1-12) para filtrar relatórios mensais.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @ApiPropertyOptional({
    example: 2025,
    description: 'Ano de referência (ex: 2025)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

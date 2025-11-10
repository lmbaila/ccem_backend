import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum MetricsRange {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export class GetMetricsRangeDto {
  @ApiPropertyOptional({
    enum: MetricsRange,
    example: MetricsRange.DAILY,
    description: 'Intervalo de tempo: daily | weekly | monthly | yearly',
  })
  @IsOptional()
  @IsEnum(MetricsRange)
  range?: MetricsRange = MetricsRange.DAILY;
}

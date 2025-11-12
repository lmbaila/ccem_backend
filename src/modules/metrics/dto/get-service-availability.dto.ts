import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsNumber, Matches, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

export class GetServiceAvailabilityDto {
  @ApiPropertyOptional({
    example: '01/2025',
    description: 'Período inicial no formato MM/YYYY (default: 01/ano corrente)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'startPeriod deve estar no formato MM/YYYY (ex: 01/2025)',
  })
  @Transform(({ value }) => {
    if (!value) {
      const now = new Date();
      return `01/${now.getFullYear()}`; // ✅ Default: Janeiro do ano atual
    }
    return value;
  })
  startPeriod!: string;

  @ApiPropertyOptional({
    example: '11/2025',
    description: 'Período final no formato MM/YYYY (default: mês/ano corrente)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'endPeriod deve estar no formato MM/YYYY (ex: 11/2025)',
  })
  @Transform(({ value }) => {
    if (!value) {
      const now = new Date();
      return format(now, 'MM/yyyy'); // ✅ Default: mês atual / ano atual
    }
    return value;
  })
  endPeriod!: string;

  @ApiPropertyOptional({
    type: [Number],
    description:
      'Lista de IDs dos serviços (opcional). Pode ser enviado como ?services=1,2,3 ou ?services[]=1&services[]=2',
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (!value) return [];
    if (typeof value === 'string') return value.split(',').map(Number);
    if (Array.isArray(value)) return value.map(Number);
    return [];
  })
  services?: number[];

  @ApiPropertyOptional({
    example: 99,
    description: 'Meta de disponibilidade em %. Default: 99%',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : 99))
  target?: number;
}

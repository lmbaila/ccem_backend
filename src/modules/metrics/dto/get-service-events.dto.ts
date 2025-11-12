import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetServiceEventsDto {
  @ApiProperty({
    example: '11/2024',
    description: 'Periodo inicial no formato MM/YYYY',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'startPeriod deve estar no formato MM/YYYY',
  })
  startPeriod!: string;

  @ApiProperty({
    example: '11/2025',
    description: 'Periodo final no formato MM/YYYY',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'endPeriod deve estar no formato MM/YYYY',
  })
  endPeriod!: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs dos serviços a incluir (obrigatório)',
    type: [Number],
  })
  @IsArray()
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : value.split(',').map(Number),
  )
  @IsNotEmpty({ message: 'Deve informar pelo menos um serviceId' })
  services!: number[];
}

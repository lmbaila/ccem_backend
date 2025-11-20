import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para os serviços impactados
 */
class ServiceImpactDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty({ message: 'serviceId é obrigatório' })
  serviceId!: number;

  @ApiProperty({ example: '2025-11-06T06:01:09.753Z' })
  @IsDateString()
  startAt!: string;

  @ApiPropertyOptional({ example: '2025-11-06T07:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  endAt?: string | null;
}

/**
 * DTO para feedbacks criados junto com o evento
 */
class FeedbackCreateDto {
  @ApiProperty({
    example: 'Evento criado via sistema de monitoria.',
    description: 'Comentario sobre o evento no momento da criacao.',
  })
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @ApiPropertyOptional({
    example: 5,
    minimum: 1,
    maximum: 5,
    description: 'Classificacao opcional de 1 a 5.',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}

/**
 * DTO principal para criacao de eventos
 */
export class CreateEventDto {
  @ApiProperty({ example: 'Servico indisponível' })
  @IsString()
  @IsNotEmpty()
  summary!: string;

  @ApiProperty({ example: 'O sistema de pagamentos encontra-se fora do ar.' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({ example: 'INC000011464847' })
  @IsNotEmpty({ message: 'O ticket é obrigatório' })
  @Matches(/^INC\d{12}$/, {
    message: 'Formato inválido. Use: INC seguido de 12 dígitos (ex: INC000011464847)',
  })
  @IsString()
  ticket!: string;

  @ApiProperty({ example: 1, description: 'ID do dashboard (ferramenta de monitoria).' })
  @IsNumber()
  dashboardId!: number;

  @ApiProperty({ example: 1, description: 'ID da origem do incidente' })
  @IsNumber()
  @IsInt()
  originId?: number | null;

  @ApiProperty({
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    example: 'PENDING',
    description: 'Estado atual do evento.',
  })
  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const)
  status!: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

  @ApiProperty({
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    example: 'LOW',
    description: 'Nivel de prioridade do evento.',
  })
  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const)
  priority!: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  @ApiPropertyOptional({
    type: [Number],
    example: [1, 2],
    description: 'IDs dos tecnicos associados ao evento.',
  })
  @IsOptional()
  @IsArray()
  technicianIds?: number[];

  @ApiProperty({
    type: [ServiceImpactDto],
    description: 'Lista de servicos impactados pelo evento.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceImpactDto)
  services!: ServiceImpactDto[];

  @ApiPropertyOptional({
    type: [FeedbackCreateDto],
    description: 'Lista opcional de feedbacks criados junto com o evento.',
    example: [
      {
        comment: 'Evento criado automaticamente via Dynatrace.',
        rating: 4,
      },
      {
        comment: 'Equipa técnica notificada.',
        rating: 5,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeedbackCreateDto)
  feedbacks?: FeedbackCreateDto[];
}

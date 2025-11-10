import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para atualizacao de servicos impactados
 */
class ServiceImpactUpdateDto {
  @ApiPropertyOptional({ example: 1, description: 'ID do servico associado.' })
  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @ApiPropertyOptional({
    example: '2025-11-01T10:00:00Z',
    description: 'Data/hora de inicio do impacto no servico.',
  })
  @IsOptional()
  @IsString()
  startAt?: string;

  @ApiPropertyOptional({
    example: '2025-11-01T12:00:00Z',
    description: 'Data/hora de fim do impacto no servico (opcional).',
  })
  @IsOptional()
  @IsString()
  endAt?: string | null;
}

/**
 * DTO para novos feedbacks adicionados durante a atualizacao
 */
class FeedbackUpdateDto {
  @ApiPropertyOptional({
    example: 'Atualizacao de status: equipe tecnica ja atuando no problema.',
    description: 'Comentario adicional adicionado durante a atualizacao do evento.',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({
    example: 4,
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
 * DTO principal para atualizacao de evento
 */
export class UpdateEventDto {
  @ApiPropertyOptional({
    example: 'Servico indisponivel parcialmente',
    description: 'Resumo atualizado do evento.',
  })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({
    example: 'Apenas alguns canais continuam indisponiveis.',
    description: 'Descricao detalhada da atualizacao.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '021913822891M',
    description: 'Numero do ticket associado (se houver).',
  })
  @IsOptional()
  @IsString()
  ticket?: string;

  @ApiPropertyOptional({
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
    example: 'IN_PROGRESS',
    description: 'Novo estado do evento.',
  })
  @IsOptional()
  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const)
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

  @ApiPropertyOptional({
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    example: 'MEDIUM',
    description: 'Prioridade atualizada do evento.',
  })
  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const)
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  @ApiPropertyOptional({
    type: [Number],
    example: [1, 3],
    description: 'IDs dos tecnicos associados ao evento.',
  })
  @IsOptional()
  @IsArray()
  technicianIds?: number[];

  @ApiPropertyOptional({
    type: [ServiceImpactUpdateDto],
    description: 'Lista atualizada de servicos impactados.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceImpactUpdateDto)
  services?: ServiceImpactUpdateDto[];

  @ApiPropertyOptional({
    type: [FeedbackUpdateDto],
    description:
      'Novos feedbacks adicionados durante a atualizacao do evento (sem apagar os antigos).',
    example: [
      {
        comment: 'Problema parcialmente resolvido.',
        rating: 4,
      },
      {
        comment: 'Monitoria confirma reducao no impacto.',
        rating: 5,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeedbackUpdateDto)
  feedbacks?: FeedbackUpdateDto[];
}

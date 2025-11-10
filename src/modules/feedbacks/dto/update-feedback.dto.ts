import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, Max, IsUUID, IsNotEmpty } from 'class-validator';

/**
 * DTO para atualização de feedbacks vinculados a eventos.
 */
export class UpdateFeedbackDto {
  @ApiProperty({
    description: 'ID do evento ao qual o feedback pertence',
    example: 'UUID-EVENT',
  })
  @IsString()
  @IsUUID('4', { message: 'eventId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'eventId é obrigatório.' })
  eventId!: string;

  @ApiPropertyOptional({
    description: 'Comentário atualizado do feedback.',
    example: 'Problema parcialmente resolvido, aguardando monitoria final.',
  })
  @IsOptional()
  @IsString({ message: 'comment deve ser uma string.' })
  comment?: string;

  @ApiPropertyOptional({
    description: 'Classificação (1 a 5) atualizada do feedback.',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt({ message: 'rating deve ser um número inteiro.' })
  @Min(1, { message: 'rating mínimo é 1.' })
  @Max(5, { message: 'rating máximo é 5.' })
  rating?: number;
}

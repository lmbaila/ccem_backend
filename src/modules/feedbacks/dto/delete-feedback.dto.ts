import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsNotEmpty } from 'class-validator';

export class DeleteFeedbackDto {
  @ApiProperty({
    example: '82fe1893-44c7-4123-9cbe-128cb0960602',
    description: 'ID do evento ao qual o feedback pertence',
  })
  @IsUUID('4', { message: 'eventId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'eventId é obrigatório.' })
  eventId!: string;

  @ApiProperty({
    example: 12,
    description: 'ID do feedback que será removido',
  })
  @IsInt({ message: 'feedbackId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'feedbackId é obrigatório.' })
  feedbackId!: number;
}

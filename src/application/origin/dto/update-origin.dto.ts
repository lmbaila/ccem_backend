import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateOriginDto } from './create-origin.dto';

export class UpdateOriginDto extends PartialType(CreateOriginDto) {
  @ApiPropertyOptional({
    example: 'Infraestrutura',
    description: 'Atualizar o nome da origem do incidente (opcional)',
  })
  name?: string;
}

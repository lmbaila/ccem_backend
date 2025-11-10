import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, ValidateIf } from 'class-validator';

export class GetEventByIdOrCodeDto {
  @ApiPropertyOptional({
    description: 'UUID do evento (gerado automaticamente pelo sistema)',
    example: '2f2c13c4-3e12-4c9b-aef9-21b58d232fa1',
  })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.code)
  id?: string;

  @ApiPropertyOptional({
    description: 'Codigo unico do evento (alfanumerico, ex: E7F8G9H0)',
    example: 'E7F8G9H0',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9]{6,12}$/, {
    message: 'O código deve conter apenas letras maiúsculas e números (6 a 12 caracteres).',
  })
  @ValidateIf((o) => !o.id)
  code?: string;
}

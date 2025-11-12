import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateTeamDto {
  @ApiProperty({
    example: 'Infraestrutura',
    description: 'Novo nome da equipa',
  })
  @IsNotEmpty({ message: 'O nome da equipa é obrigatório' })
  @IsString()
  @MaxLength(100, { message: 'O nome não pode exceder 100 caracteres' })
  name!: string;
}

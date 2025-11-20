import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOriginDto {
  @ApiProperty({
    example: 'Network',
    description: 'Nome da origem do incidente',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

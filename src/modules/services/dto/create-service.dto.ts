import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'OIC Transfer' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Servico de transferencias interbancarias' })
  @IsString()
  @IsNotEmpty()
  description!: string;
}

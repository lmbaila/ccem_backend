import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechnicianDto {
  @ApiProperty({ example: 'Carlos Matavele' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'T001' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'carlos@sb.co.mz' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  teamId?: number;
}

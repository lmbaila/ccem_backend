import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'a830919' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'Lazaro' })
  @IsString()
  firstname!: string;

  @ApiProperty({ example: 'Mbaila' })
  @IsString()
  lastname!: string;

  @ApiProperty({ example: 'lazaro@sb.co.mz' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'admin123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'ADMIN', enum: ['ADMIN', 'COMMANDCENTRE', 'VIEWER'] })
  @IsEnum(['ADMIN', 'COMMANDCENTRE', 'VIEWER'] as any)
  role!: 'ADMIN' | 'COMMANDCENTRE' | 'VIEWER';
}

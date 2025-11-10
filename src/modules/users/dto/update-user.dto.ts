import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateUserDto {
  @ApiPropertyOptional() @IsOptional() @IsString() firstname?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() lastname?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional({ minLength: 6 }) @IsOptional() @IsString() @MinLength(6) password?: string;
  @ApiPropertyOptional({ enum: ['ADMIN', 'COMMANDCENTRE', 'VIEWER'] })
  @IsOptional()
  @IsEnum(['ADMIN', 'COMMANDCENTRE', 'VIEWER'] as any)
  role?: 'ADMIN' | 'COMMANDCENTRE' | 'VIEWER';
}

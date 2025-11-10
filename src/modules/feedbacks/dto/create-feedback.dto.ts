import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ example: 'Resolveram o incidente rapidamente.' })
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @ApiProperty({ example: 5, required: false, minimum: 1, maximum: 5 })
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({ example: 'event-uuid' })
  @IsString()
  @IsUUID()
  eventId!: string;
}

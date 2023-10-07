import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class DefaultDto {
  @ApiProperty({
    format: 'date-time',
    example: '2023-12-12 12:00:00.000',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAt: string;
}

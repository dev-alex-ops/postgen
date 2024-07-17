import { Type } from 'class-transformer'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateBaseDto, FindBaseDto } from '../../commons/dtos/base.dto'

export class CreateMessageDto extends CreateBaseDto {
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId: number

  @ApiProperty({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  content: string
}

export class FindMessageDto extends FindBaseDto {
  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  userId?: number
}

export class UpdateMessageDto {
  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string
}

import { Type } from 'class-transformer'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { CreateBaseDto, FindBaseDto } from '../../commons/dtos/base.dto'

export class CreateMessageDto extends CreateBaseDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId: number

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  content: string
}

export class FindMessageDto extends FindBaseDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  userId?: number
}

export class UpdateMessageDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string
}

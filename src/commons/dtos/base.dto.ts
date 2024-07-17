import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateBaseDto {
  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  id?: number
}

export class FindBaseDto {
  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  id?: number
}

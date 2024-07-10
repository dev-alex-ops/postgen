import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateBaseDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  id?: number
}

export class FindBaseDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  id?: number
}

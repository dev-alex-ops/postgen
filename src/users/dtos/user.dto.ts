import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateBaseDto, FindBaseDto } from '../../commons/dtos/base.dto'

export class CreateUserDto extends CreateBaseDto {
  @ApiProperty({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ type: String })
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  minibio?: string
}

export class FindUserDto extends FindBaseDto {
  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string
}

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string

  @ApiPropertyOptional({ type: String })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  minibio?: string
}

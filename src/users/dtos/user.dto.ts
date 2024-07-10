import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { CreateBaseDto, FindBaseDto } from '../../commons/dtos/base.dto'

export class CreateUserDto extends CreateBaseDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  username: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  password: string

  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  lastName: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  minibio: string
}

export class FindUserDto extends FindBaseDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string

  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string
}

export class UpdateUserDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string

  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  minibio?: string
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { UserService } from '../services/user.service'
import { CreateUserDto, FindUserDto, UpdateUserDto } from '../dtos/user.dto'
import {
  CreateUserResponse,
  FindUserResponse,
} from '../interfaces/user.interface'
import {
  CreateUser,
  FindUser,
  UpdateUser,
} from '../../databases/interfaces/user.interface'

@Controller('users')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createDto: CreateUserDto): CreateUserResponse {
    const create: CreateUser = { ...createDto }

    return this._service.createUser(create)
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): FindUserResponse {
    const find: FindUser = { id }

    return this._service.findUser(find)
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() findDto: FindUserDto): FindUserResponse {
    const find: FindUser = { ...findDto }

    return this._service.findUsers(find)
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ): void {
    const find: FindUser = { id }
    const update: UpdateUser = { ...updateDto }

    this._service.updateUser(find, update)
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    const find: FindUser = { id }

    this._service.deleteUser(find)
  }
}

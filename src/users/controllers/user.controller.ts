import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _service: UsersService) {}

  @Get()
  list() {
    return this._service.list();
  }

  @Get(':userId')
  find(@Param('userId') userId: number) {
    return this._service.find(userId);
  }

  @Post()
  create(@Body() payload: any) {
    return this._service.create(payload);
  }

  @Put(':userId')
  update(@Param('userId') userId: number, @Body() payload: any) {
    return this._service.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: number) {
    return this._service.delete(userId);
  }
}

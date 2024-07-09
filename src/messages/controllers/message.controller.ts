import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessagesService } from '../services/message.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly _service: MessagesService) {}

  @Post()
  create(@Body() payload: any) {
    return this._service.create(payload);
  }

  @Get()
  findAll() {
    return this._service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this._service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this._service.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this._service.delete(id);
  }
}

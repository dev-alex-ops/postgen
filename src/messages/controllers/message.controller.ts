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
import { MessageService } from '../services/message.service'
import {
  CreateMessageDto,
  FindMessageDto,
  UpdateMessageDto,
} from '../dtos/message.dto'
import {
  CreateMessageResponse,
  FindMessageResponse,
} from '../interfaces/message.interface'
import {
  CreateMessage,
  FindMessage,
  UpdateMessage,
} from '../../databases/interfaces/message.interface'

@Controller('messages')
export class MessageController {
  constructor(private readonly _service: MessageService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createDto: CreateMessageDto): CreateMessageResponse {
    const create: CreateMessage = { ...createDto }

    return this._service.createMessage(create)
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): FindMessageResponse {
    const find: FindMessage = { id }

    return this._service.findMessage(find)
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() findDto: FindMessageDto): FindMessageResponse {
    const find: FindMessage = { ...findDto }

    return this._service.findMessages(find)
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMessageDto,
  ): void {
    const find: FindMessage = { id }
    const update: UpdateMessage = { ...updateDto }

    this._service.updateMessage(find, update)
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    const find: FindMessage = { id }

    this._service.deleteMessage(find)
  }
}

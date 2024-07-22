import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { MessageEntity } from '../../databases/entities/message.entity'
import { MessageRepository } from '../../databases/repositories/message.repository'
import { UserRepository } from '../../databases/repositories/user.repository'
import { MessageError } from '../../databases/enums/message.enum'
import { UserError } from '../../databases/enums/user.enum'
import {
  CreateMessage,
  FindMessage,
  UpdateMessage,
} from '../../databases/interfaces/message.interface'
import { FindUser } from '../../databases/interfaces/user.interface'
import {
  CreateMessageResponse,
  FindMessageResponse,
} from '../interfaces/message.interface'

@Injectable()
export class MessageService {
  constructor(
    private _messageRepository: MessageRepository,
    private _userRepository: UserRepository,
  ) {}

  createMessage(create: CreateMessage): CreateMessageResponse {
    const findUser: FindUser = { id: create.userId }
    const [user] = this._userRepository.find(findUser)
    if (!user) {
      throw new BadRequestException({ message: UserError.NotFound })
    }

    if (create.id) {
      const findMessage: FindMessage = { id: create.id }
      const found = this._messageRepository.find(findMessage)
      if (found.length !== 0) {
        throw new BadRequestException({
          message: MessageError.IdAlreadyRegistered,
        })
      }
    }

    const message = this._messageRepository.create(create)

    const response: CreateMessageResponse = { message }
    return response
  }

  findMessage(find: FindMessage): FindMessageResponse {
    const [message]: MessageEntity[] = this._messageRepository.find(find)

    const response: FindMessageResponse = { message }
    return response
  }

  findMessages(find: FindMessage): FindMessageResponse {
    const messages: MessageEntity[] = this._messageRepository.find(find)

    const response: FindMessageResponse = { messages }
    return response
  }

  updateMessage(find: FindMessage, update: UpdateMessage): void {
    const [message] = this._messageRepository.find(find)
    if (!message) {
      throw new NotFoundException({ message: MessageError.NotFound })
    }

    this._messageRepository.update(find, update)
  }

  deleteMessage(find: FindMessage): void {
    const user = this._messageRepository.find(find)
    if (!user) {
      throw new NotFoundException({ message: MessageError.NotFound })
    }

    this._messageRepository.delete(find)
  }
}

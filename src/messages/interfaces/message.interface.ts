import { MessageEntity } from '../../databases/entities/message.entity'

export class CreateMessageResponse {
  message: MessageEntity
}

export class FindMessageResponse {
  message?: MessageEntity
  messages?: MessageEntity[]
}

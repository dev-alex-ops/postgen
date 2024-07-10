import { MessageEntity } from '../../databases/entities/message.entity'

export class CreateMessageResponse {
  message: MessageEntity
}

export class GetMessageResponse {
  message: MessageEntity
}

export class FindMessageResponse {
  messages: MessageEntity[]
}

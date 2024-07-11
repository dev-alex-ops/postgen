import { BaseEntity } from '../../commons/entities/base.entity'

export class MessageEntity extends BaseEntity {
  static className = 'messages'

  content: string
  userId: number
}

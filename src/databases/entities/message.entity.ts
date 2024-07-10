import { BaseEntity } from '../../commons/entities/base.entity'

export class MessageEntity extends BaseEntity {
  content: string
  userId: number
}

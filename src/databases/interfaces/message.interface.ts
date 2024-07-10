import { CreateBase, FindBase } from '../../commons/interfaces/base.interface'

export interface CreateMessage extends CreateBase {
  content: string
  userId: number
}

export interface FindMessage extends FindBase {
  userId?: number
}

export interface UpdateMessage {
  content?: string
}

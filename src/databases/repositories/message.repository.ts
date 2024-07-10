import { Injectable } from '@nestjs/common'
import { MessageEntity } from '../entities/message.entity'
import {
  CreateMessage,
  FindMessage,
  UpdateMessage,
} from '../interfaces/message.interface'

@Injectable()
export class MessageRepository {
  private _records: MessageEntity[]
  private _maxId: number

  constructor() {
    this._records = []
    this._maxId = 0
  }

  private _incrementMaxId(): number {
    if (this._records.length !== 0) {
      this._maxId = this._records.length[this._records.length - 1].id + 1
    } else {
      this._maxId++
    }
    //this._records.length !== 0 ? this._records.length[this._records.length - 1].id + 1 : 1
    return this._maxId
  }

  create(create: CreateMessage): MessageEntity {
    const nextId = this._incrementMaxId()

    const newObject = { id: nextId, ...create }
    this._records.push(newObject)

    return newObject
  }
  find(find: FindMessage): MessageEntity[] {
    if (find.id) {
      return this._records.filter(({ id }) => id === find.id)
    }

    let founds = this._records
    if (find.userId) {
      founds = founds.filter(({ userId }) => userId === find.userId)
    }

    return founds
  }
  update(find: FindMessage, update: UpdateMessage): void {
    //
  }
  delete(find: FindMessage): void {
    //
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { load, save } from '../../commons/helpers/file-system.helper'
import { MessageEntity } from '../entities/message.entity'
import { MessageError } from '../enums/message.enum'
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
    this._load()
  }

  _load() {
    this._records = load<MessageEntity>(MessageEntity.className)

    this._maxId = 0
    this._records.forEach((item) => {
      if (item.id >= this._maxId) {
        this._maxId = item.id
      }
    })
  }

  _save() {
    save<MessageEntity>(MessageEntity.className, this._records)
  }

  create(create: CreateMessage): MessageEntity {
    this._load()

    let { id, ...rest } = create
    if (!id) {
      this._maxId++
      id = this._maxId
    }

    const newObject: MessageEntity = { id, ...rest }
    this._records.push(newObject)
    this._save()

    return newObject
  }

  find(find: FindMessage): MessageEntity[] {
    this._load()

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
    this._load()

    const [found] = this.find(find)
    if (!found) {
      throw new NotFoundException({ message: MessageError.NotFound })
    }

    if (update.content) {
      found.content = update.content
    }

    this._save()
  }

  delete(find: FindMessage): void {
    this._load()

    const [found] = this.find(find)
    if (!found) {
      throw new NotFoundException({ message: MessageError.NotFound })
    }

    if (find.id) {
      this._records.splice(
        this._records.findIndex(({ id }) => id === found.id),
        1,
      )
    }

    if (find.userId) {
      this._records = this._records.filter(
        ({ userId }) => userId !== found.userId,
      )
    }

    this._save()
  }
}

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { load, save } from '../../commons/helpers/file-system.helper'
import { MessageEntity } from '../entities/message.entity'
import { MessageError } from '../enums/message.enum'
import {
  CreateMessage,
  FindMessage,
  UpdateMessage,
} from '../interfaces/message.interface'

@Injectable()
export class MessageRepository implements OnModuleInit {
  private _records: MessageEntity[]
  private _maxId: number

  constructor() {
    this._records = []
    this._maxId = 0
  }

  async onModuleInit() {
    await this._load()
  }

  private async _load() {
    this._records = await load<MessageEntity>(MessageEntity.className)
    this._records.forEach(({ id }) => {
      if (id > this._maxId) {
        this._maxId = id
      }
    })
  }
  private async _save() {
    await save<MessageEntity>(MessageEntity.className, this._records)
  }

  create(create: CreateMessage): MessageEntity {
    let { id, userId, content } = create
    if (!id) {
      this._maxId++
      id = this._maxId
    }

    const newObject = { id, userId, content }
    this._records.push(newObject)
    this._save()

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
    const found = this.find(find)
    if (found.length !== 0) {
      throw new NotFoundException({ message: MessageError.NotFound })
    }

    if (find.id) {
      this._records.splice(
        this._records.findIndex(({ id }) => id === found[0].id),
        1,
      )
    }

    if (find.userId) {
      this._records = this._records.filter(
        ({ userId }) => userId !== find.userId,
      )
    }

    this._save()
  }
}

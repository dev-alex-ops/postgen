import { Injectable, NotFoundException } from '@nestjs/common'
import { SharedResource } from '../../config/resources/shared.resource'
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

  constructor(private _sharedResource: SharedResource) {
    this._maxId = 0

    this._records = this._sharedResource.getMessageRecords()
    this._records.forEach((item) => {
      if (item.id >= this._maxId) {
        this._maxId = item.id
      }
    })
  }

  create(create: CreateMessage): MessageEntity {
    let { id, ...rest } = create
    if (!id) {
      this._maxId++
      id = this._maxId
    }

    const newObject: MessageEntity = { id, ...rest }
    this._records.push(newObject)
    this._sharedResource.setMessageRecords(this._records)

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

    this._sharedResource.setMessageRecords(this._records)
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

    this._sharedResource.setMessageRecords(this._records)
  }
}

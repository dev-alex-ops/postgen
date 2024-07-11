import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { load, save } from '../../commons/helpers/file-system.helper'
import { slugify } from '../../commons/helpers/validation.helper'
import { UserEntity } from '../entities/user.entity'
import { MessageRepository } from './message.repository'
import { CreateUser, FindUser, UpdateUser } from '../interfaces/user.interface'
import { UserError } from '../enums/user.enum'
import { FindMessage } from '../interfaces/message.interface'

@Injectable()
export class UserRepository implements OnModuleInit {
  private _records: UserEntity[]
  private _maxId: number

  constructor(private _messageRepository: MessageRepository) {
    this._records = []
    this._maxId = 0
  }

  async onModuleInit() {
    await this._load()
  }

  private async _load(): Promise<void> {
    this._records = await load<UserEntity>(UserEntity.className)
    this._records.forEach(({ id }) => {
      if (id > this._maxId) {
        this._maxId = id
      }
    })
  }
  private async _save(): Promise<void> {
    await save<UserEntity>(UserEntity.className, this._records)
  }

  create(create: CreateUser): UserEntity {
    let { id, username, password, email, name, lastName, minibio } = create
    if (!id) {
      this._maxId++
      id = this._maxId
    }

    const newObject = { id, username, password, email, name, lastName, minibio }
    this._records.push(newObject)
    this._save()

    return newObject
  }

  find(find: FindUser): UserEntity[] {
    if (find.id) {
      return this._records.filter(({ id }) => id === find.id)
    }

    let founds = this._records
    if (find.username) {
      founds = founds.filter(({ username }) => username === find.username)
    }
    if (find.email) {
      founds = founds.filter(({ email }) => email === find.email)
    }
    if (find.name) {
      founds = founds.filter(({ name }) => slugify(name) === slugify(find.name))
    }
    if (find.lastName) {
      founds = founds.filter(
        ({ lastName }) => slugify(lastName) === slugify(find.lastName),
      )
    }

    return founds
  }

  update(find: FindUser, update: UpdateUser): void {
    const [found] = this.find(find)
    if (!found) {
      throw new NotFoundException({ message: UserError.NotFound })
    }

    if (update.username) {
      found.username = update.username
    }
    if (update.password) {
      found.password = update.password
    }
    if (update.email) {
      found.email = update.email
    }
    if (update.name) {
      found.name = update.name
    }
    if (update.lastName) {
      found.lastName = update.lastName
    }
    if (update.minibio) {
      found.minibio = update.minibio
    }

    this._save()
  }

  delete(find: FindUser): void {
    const [found] = this.find(find)
    if (!found) {
      throw new NotFoundException({ message: UserError.NotFound })
    }

    this._records.splice(
      this._records.findIndex(({ id }) => id === found.id),
      1,
    )

    const findMessages: FindMessage = { userId: found.id }
    this._messageRepository.delete(findMessages)

    this._save()
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { slugify } from '../../commons/helpers/validation.helper'
import { SharedResource } from '../../config/resources/shared.resource'
import { UserEntity } from '../entities/user.entity'
import { CreateUser, FindUser, UpdateUser } from '../interfaces/user.interface'
import { UserError } from '../enums/user.enum'

@Injectable()
export class UserRepository {
  private _records: UserEntity[]
  private _maxId: number

  constructor(private _sharedResource: SharedResource) {
    this._maxId = 0

    this._records = this._sharedResource.getUserRecords()
    this._records.forEach((item) => {
      if (item.id >= this._maxId) {
        this._maxId = item.id
      }
    })
  }

  create(create: CreateUser): UserEntity {
    let { id, ...rest } = create
    if (!id) {
      this._maxId++
      id = this._maxId
    }

    const newObject: UserEntity = { id, ...rest }
    this._records.push(newObject)
    this._sharedResource.setUserRecords(this._records)

    return newObject
  }

  find(find: FindUser): UserEntity[] {
    console.log('records:', this._records.length, this._records)
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

    this._sharedResource.setUserRecords(this._records)
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

    this._sharedResource.setUserRecords(this._records)
  }
}

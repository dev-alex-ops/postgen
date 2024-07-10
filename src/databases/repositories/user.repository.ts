import { Injectable } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'
import { CreateUser, FindUser, UpdateUser } from '../interfaces/user.interface'

@Injectable()
export class UserRepository {
  private _records: UserEntity[]
  private _maxId: number

  constructor() {
    this._records = []
    this._maxId = 0
  }

  create(create: CreateUser): UserEntity {
    return null
  }
  find(find: FindUser): UserEntity[] {
    return null
  }
  update(find: FindUser, update: UpdateUser): void {
    //
  }
  delete(find: FindUser): void {
    //
  }
}

// Packages
import { Inject, Injectable } from '@nestjs/common'
// Entities
import { MessageEntity } from '../../databases/entities/message.entity'
import { UserEntity } from '../../databases/entities/user.entity'

@Injectable()
export class SharedResource {
  private _userRecords: UserEntity[]
  private _messageRecords: MessageEntity[]

  constructor() {}

  getMessageRecords(): MessageEntity[] {
    return this._messageRecords
  }
  setMessageRecords(records: MessageEntity[]): void {
    this._messageRecords = records
  }

  getUserRecords(): UserEntity[] {
    return this._userRecords
  }
  setUserRecords(records: UserEntity[]): void {
    this._userRecords = records
  }
}

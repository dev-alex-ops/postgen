import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UserEntity } from '../../databases/entities/user.entity'
import { UserRepository } from '../../databases/repositories/user.repository'
import { UserError } from '../../databases/enums/user.enum'
import {
  CreateUser,
  FindUser,
  UpdateUser,
} from '../../databases/interfaces/user.interface'
import {
  CreateUserResponse,
  FindUserResponse,
} from '../interfaces/user.interface'

@Injectable()
export class UserService {
  constructor(private _repository: UserRepository) {}

  createUser(create: CreateUser): CreateUserResponse {
    let find: FindUser
    let found: UserEntity[]

    if (create.id) {
      find = { id: create.id }
      found = this._repository.find(find)
      if (found.length !== 0) {
        throw new BadRequestException({
          message: UserError.IdAlreadyRegistered,
        })
      }
    }

    find = { username: create.username }
    found = this._repository.find(find)
    if (found.length !== 0) {
      throw new BadRequestException({
        message: UserError.UsernameAlreadyRegistered,
      })
    }

    find = { email: create.email }
    found = this._repository.find(find)
    if (found.length !== 0) {
      throw new BadRequestException({
        message: UserError.EmailAlreadyRegistered,
      })
    }

    const user: UserEntity = this._repository.create(create)

    const response: CreateUserResponse = { user }
    return response
  }

  findUser(find: FindUser): FindUserResponse {
    const [user]: UserEntity[] = this._repository.find(find)

    const response: FindUserResponse = { user }
    return response
  }

  findUsers(find: FindUser): FindUserResponse {
    const users: UserEntity[] = this._repository.find(find)

    const response: FindUserResponse = { users }
    return response
  }

  updateUser(find: FindUser, update: UpdateUser): void {
    const user = this._repository.find(find)
    if (!user) {
      throw new NotFoundException({ message: UserError.NotFound })
    }

    this._repository.update(find, update)
  }

  deleteUser(find: FindUser): void {
    const user = this._repository.find(find)
    if (!user) {
      throw new NotFoundException({ message: UserError.NotFound })
    }

    this._repository.delete(find)
  }
}

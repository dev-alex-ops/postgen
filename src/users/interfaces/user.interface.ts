import { UserEntity } from '../../databases/entities/user.entity'

export class CreateUserResponse {
  user: UserEntity
}

export class GetUserResponse {
  user: UserEntity
}

export class FindUserResponse {
  users: UserEntity[]
}

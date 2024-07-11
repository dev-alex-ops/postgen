import { UserEntity } from '../../databases/entities/user.entity'

export class CreateUserResponse {
  user: UserEntity
}

export class FindUserResponse {
  user?: UserEntity
  users?: UserEntity[]
}

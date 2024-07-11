import { BaseEntity } from '../../commons/entities/base.entity'

export class UserEntity extends BaseEntity {
  static className = 'users'

  username: string
  password: string
  email: string
  name: string
  lastName: string
  minibio: string
}

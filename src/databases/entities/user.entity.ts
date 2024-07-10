import { BaseEntity } from '../../commons/entities/base.entity'

export class UserEntity extends BaseEntity {
  username: string
  password: string
  email: string
  name: string
  lastName: string
  minibio: string
}

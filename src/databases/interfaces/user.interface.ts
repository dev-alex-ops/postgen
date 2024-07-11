import { CreateBase, FindBase } from '../../commons/interfaces/base.interface'

export interface CreateUser extends CreateBase {
  username: string
  password: string
  email: string
  name: string
  lastName: string
  minibio: string
}

export interface FindUser extends FindBase {
  username?: string
  password?: string
  email?: string
  name?: string
  lastName?: string
}

export interface UpdateUser {
  username?: string
  password?: string
  email?: string
  name?: string
  lastName?: string
  minibio?: string
}

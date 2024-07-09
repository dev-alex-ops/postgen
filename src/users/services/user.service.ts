import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private maxId: number = 0;
  private users: User[] = [];

  list(): any {
    return this.users;
  }

  find(id: number): User {
    const found = this.users.find((item) => item.id == id);
    if (!found) {
      throw new NotFoundException({
        message: `User with id ${id} could not be found`,
      });
    }
    return found;
  }

  create(payload: any): any {
    this.maxId++;
    const newUser = {
      id: this.maxId,
      ...payload,
    };
    return {
      message: `User succesfully created!`,
      id: newUser.id,
    };
  }

  update(id: number, payload: any): any {
    const found = this.find(id);
    return {
      message: `User ${id} succesfully modified:`,
      payload,
    };
  }

  delete(id: number): any {
    return {
      message: `User ${id} succesfully removed!`,
    };
  }
}

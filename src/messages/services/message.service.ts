import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  private maxId: number = 3;
  private messages: Message[] = [
    {
      id: 1,
      content: 'Este es el primer mensaje, qué ilusión',
      userId: 1,
    },
    {
      id: 2,
      content: 'Ahora este es el segundo mensaje, cómo mola!',
      userId: 1,
    },
    {
      id: 3,
      content: 'Este es MI primer mensaje, que no el primero de todos, OJETE *',
      userId: 2,
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: number): Message {
    const found = this.messages.find((message) => message.id === id);
    if (!found) {
      throw new NotFoundException(`Message with id ${id} could not be found`);
    }

    return found;
  }

  create(payload: any) {
    this.maxId++;
    const newMessage = {
      id: this.maxId,
      ...payload,
    };
    this.messages.push(newMessage);
    return {
      message: `Your message has been posted!`,
      id: newMessage.id,
    };
  }

  update(id: number, payload: any) {
    const index = this.messages.findIndex((message) => message.id == id);

    if (index == -1) {
      throw new NotFoundException(`Message with id ${id} could not be found.`);
    }

    if (payload.content) {
      this.messages[index].content = payload.content;
    }

    return {
      message: `Message ${id} succesfully modified:`,
    };
  }

  delete(id: number) {
    const found = this.findOne(id);
    this.messages = this.messages.filter((item) => item.id != found.id);
  }
}

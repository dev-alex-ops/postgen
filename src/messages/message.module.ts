import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/message.controller';
import { MessagesService } from './services/message.service';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessageModule {}

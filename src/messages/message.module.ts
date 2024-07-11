import { Module } from '@nestjs/common'
import { DatabaseModule } from '../databases/database.module'
import { MessageController } from './controllers/message.controller'
import { MessageRepository } from '../databases/repositories/message.repository'
import { MessageService } from './services/message.service'

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [MessageRepository, MessageService],
})
export class MessageModule {}

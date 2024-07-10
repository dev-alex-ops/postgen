import { Module } from '@nestjs/common'
import { MessageRepository } from './repositories/message.repository'
import { UserRepository } from './repositories/user.repository'

const repositories: any[] = [MessageRepository, UserRepository]

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class DatabaseModule {}

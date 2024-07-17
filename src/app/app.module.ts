import { Module } from '@nestjs/common'
import { DatabaseModule } from '../databases/database.module'
import { MessageModule } from '../messages/message.module'
import { UserModule } from '../users/user.module'

@Module({
  imports: [DatabaseModule, MessageModule, UserModule],
})
export class AppModule {}

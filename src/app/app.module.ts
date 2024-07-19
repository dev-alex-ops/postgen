import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { DatabaseModule } from '../databases/database.module'
import { MessageModule } from '../messages/message.module'
import { UserModule } from '../users/user.module'

@Module({
  imports: [ConfigModule, DatabaseModule, MessageModule, UserModule],
})
export class AppModule {}

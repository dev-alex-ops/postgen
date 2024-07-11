import { Module } from '@nestjs/common'
import { DatabaseModule } from '../databases/database.module'
import { MessageModule } from '../messages/message.module'
import { UserModule } from '../users/user.module'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'

@Module({
  imports: [DatabaseModule, MessageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

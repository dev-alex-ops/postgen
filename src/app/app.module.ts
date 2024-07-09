import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MessagesController } from 'src/messages/controllers/message.controller';
import { MessagesService } from 'src/messages/services/message.service';
import { UsersController } from 'src/users/controllers/user.controller';
import { UsersService } from 'src/users/services/user.service';

@Module({
  imports: [],
  controllers: [AppController, MessagesController, UsersController],
  providers: [AppService, MessagesService, UsersService],
})
export class AppModule {}

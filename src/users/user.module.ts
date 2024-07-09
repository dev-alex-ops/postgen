import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}

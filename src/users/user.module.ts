import { Module } from '@nestjs/common'
import { DatabaseModule } from '../databases/database.module'
import { UserController } from './controllers/user.controller'
import { UserRepository } from '../databases/repositories/user.repository'
import { UserService } from './services/user.service'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module'; // Verifique o caminho correto
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}

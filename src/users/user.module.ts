import { forwardRef, Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module'; // Verifique o caminho correto
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}

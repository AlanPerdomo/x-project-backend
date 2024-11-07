import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CardController } from './card.contorller';
import { cardProviders } from './card.provider';
import { CardService } from './card.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), forwardRef(() => UserModule), LogModule],
  controllers: [CardController],
  providers: [...cardProviders, CardService],
  exports: [CardService],
})
export class CardModule {}

import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/users/user.module';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { deckProviders } from './deck.provider';
import { CardModule } from '../card/card.module';

@Module({
  imports: [DatabaseModule, CardModule, forwardRef(() => UserModule)],
  controllers: [DeckController],
  providers: [...deckProviders, DeckService],
  exports: [DeckService],
})
export class DeckModule {}

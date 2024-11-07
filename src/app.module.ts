import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerolaModule } from './perolas/perola.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { DeckModule } from './tcg/deck/deck.module';
import { CardModule } from './tcg/card/card.module';

@Module({
  imports: [
    AuthModule,
    PerolaModule,
    TokenModule,
    CardModule,
    DeckModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

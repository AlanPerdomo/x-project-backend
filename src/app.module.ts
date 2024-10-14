import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PerolaModule } from './perolas/perola.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule,PerolaModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

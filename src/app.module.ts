import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PerolaModule } from './perolas/perola.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule,PerolaModule,DatabaseModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }), AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { logProviders } from './log.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LogController],
  providers: [...logProviders, LogService],
  exports: [LogService],
})
export class LogModule {}

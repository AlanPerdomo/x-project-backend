import { Module, forwardRef } from '@nestjs/common';
import { perolaProviders } from './perola.providers';
import { PerolaService } from './perola.service';
import { DatabaseModule } from 'src/database/database.module';
import { PerolaController } from './perola.controller';
import { UserModule } from 'src/users/user.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule), LogModule],
  controllers: [PerolaController],
  providers: [...perolaProviders, PerolaService],
  exports: [PerolaService],
})
export class PerolaModule {}

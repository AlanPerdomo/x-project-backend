import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders], // Exporta para ser utilizado em outros módulos
})
export class DatabaseModule {}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
  ) {}

  async listar(): Promise<Log[]> {
    return await this.logRepository.find();
  }

  async cadastrar(data): Promise<Log> {
    // const log = new Log();

    return await this.logRepository.save(data);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class LogService {
  constructor(
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
  ) {}

  async listar(): Promise<Log[]> {
    return await this.logRepository.find();
  }

  async cadastrar(data: { logMessage: string; logDate: Date; logType: string; user: User }): Promise<Log> {
    const log = new Log();

    log.logMessage = data.logMessage;
    log.logDate = data.logDate;
    log.logType = data.logType;
    log.user = data.user;

    return await this.logRepository.save(data);
  }
}

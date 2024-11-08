import { Get, Controller, Post, Body } from '@nestjs/common';
import { PerolaService } from './perola.service';
import { Perola } from './perola.entity';
import { PerolaCreateDto } from './dto/perola.create.dto';
import { ResultDto } from 'src/dto/result.dto';
import { UserService } from 'src/users/user.service';
import { LogService } from 'src/log/log.service';
@Controller('perolas')
export class PerolaController {
  constructor(
    private readonly perolaService: PerolaService,
    private readonly userService: UserService,
    private readonly LogService: LogService,
  ) {}

  @Get('listar')
  async listar(): Promise<Perola[]> {
    return await this.perolaService.listar();
  }

  @Get('sorte')
  async sorte(): Promise<Perola> {
    return await this.perolaService.sorte();
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: PerolaCreateDto): Promise<ResultDto> {
    await this.LogService.cadastrar({
      logDate: new Date(),
      logMessage: 'cadastrou o perola ' + data.perola,
      logType: 'perola',
      user: await this.userService.findByDiscordId(data.userId.toString()),
    });
    return await this.perolaService.cadastrar(data);
  }
}

import { Body, Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { AuthGuard } from '@nestjs/passport';
import { CardCreateDto } from './dto/card.crate.dto';
import { ResultDto } from 'src/dto/result.dto';
import { LogService } from 'src/log/log.service';
import { UserService } from 'src/users/user.service';

@Controller('tcg/cards')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private LogService: LogService,
    private userService: UserService,
  ) {}

  @Get('list')
  async cardsList() {
    return await this.cardService.cardsList();
  }
  // @UseGuards(AuthGuard('jwt'))
  @Post('create-card')
  async createCard(@Request() req, @Body() data: CardCreateDto): Promise<ResultDto> {
    await this.LogService.cadastrar({
      logDate: new Date(),
      logMessage: 'cadastrou a carta ' + data.nome,
      logType: 'perola',
      user: await this.userService.findById(req.user.id),
    });
    return await this.cardService.createCard(data);
  }
}

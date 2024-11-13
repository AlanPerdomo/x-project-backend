import { Body, Request, Controller, Get, Post, UseGuards, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { AuthGuard } from '@nestjs/passport';
import { CardCreateDto } from './dto/card.crate.dto';
import { ResultDto } from 'src/dto/result.dto';

@Controller('tcg/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('list')
  async cardsList() {
    return await this.cardService.cardsList();
  }

  @Get('card/:id')
  async card(@Param('id') id: number) {
    return await this.cardService.card(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-card')
  async createCard(@Request() req, @Body() data: CardCreateDto): Promise<ResultDto> {
    return await this.cardService.createCard(data, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('card/:id')
  async deleteCard(@Request() req, @Param('id') id: number): Promise<ResultDto> {
    return await this.cardService.deleteCard(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-multiple-cards')
  async createMultipleCards(@Request() req, @Body() data: CardCreateDto[]): Promise<ResultDto> {
    return await this.cardService.createMultipleCards(data, req.user.id);
  }
}

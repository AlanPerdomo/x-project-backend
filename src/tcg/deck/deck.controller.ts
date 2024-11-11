import { Controller, Get, UseGuards, Request, Put } from '@nestjs/common';
import { DeckService } from './deck.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tcg/decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('my-deck')
  async myDeck(@Request() req) {
    return await this.deckService.myDecks(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('add-card')
  async addCard(@Request() req) {
    return await this.deckService.addRandomCard(req.user.id);
  }
}

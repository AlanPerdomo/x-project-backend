import { Controller, Get, UseGuards, Request } from '@nestjs/common';
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
}

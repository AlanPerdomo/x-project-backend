import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Deck } from './deck.entity';
import { DeckCreateDto } from './dto/deck.create.dto';
import { ResultDto } from 'src/dto/result.dto';
import { UserService } from 'src/users/user.service';
import { CardService } from '../card/card.service';

@Injectable()
export class DeckService {
  constructor(
    @Inject('DECK_REPOSITORY')
    private deckRepository: Repository<Deck>,
    private userService: UserService,
    private cardService: CardService,
  ) {}

  async myDecks(userId: number) {
    if (!(await this.userService.findById(userId))) {
      return <ResultDto>{
        status: false,
        message: 'usuario nao encontrado',
        result: null,
      };
    }
    try {
      await this.findByUserId(userId);
      return <ResultDto>{
        status: true,
        message: 'deck encontrado',
        result: await this.findByUserId(userId),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return <ResultDto>{
        status: false,
        message: 'deck nao encontrado',
        result: null,
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addRandomCard(_data: any) {}

  async cadastrar(data: DeckCreateDto): Promise<ResultDto> {
    if (!(await this.userService.findByDiscordId(data.user))) {
      return <ResultDto>{
        status: false,
        message: 'usuario nao encontrado',
        result: null,
      };
    }
  }

  async findByUserId(userId: number): Promise<Deck[]> {
    return await this.deckRepository.find({ where: { user: { id: userId } }, relations: ['card'] });
  }
}

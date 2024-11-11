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

  async addRandomCard(userId: number) {
    const user = await this.userService.findById(userId);
    const card = await this.cardService.getRandomCard();

    try {
      const existingCardInDeck = await this.deckRepository.findOne({
        where: { user: { id: userId }, card: { id: card.id } },
      });

      if (existingCardInDeck) {
        existingCardInDeck.quantity += 1;
        await this.deckRepository.save(existingCardInDeck);
      } else {
        await this.deckRepository.save({
          id: null,
          quantity: 1,
          user: user,
          card: card,
          created_at: new Date(),
        });
      }

      return <ResultDto>{
        status: true,
        message: 'Carta adicionada ao deck',
        result: card,
      };
    } catch (error) {
      console.log(error);
      return <ResultDto>{
        status: false,
        message: 'Ocorreu um erro ao adicionar a carta ao deck',
        result: error,
      };
    }
  }

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

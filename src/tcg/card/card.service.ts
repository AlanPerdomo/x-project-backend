import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CardCreateDto } from './dto/card.crate.dto';
import { ResultDto } from 'src/dto/result.dto';
import { LogService } from 'src/log/log.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class CardService {
  constructor(
    @Inject('CARD_REPOSITORY')
    private cardRepository: Repository<Card>,
    private LogService: LogService,
    private userService: UserService,
  ) {}

  async cardsList() {
    return await this.cardRepository.find();
  }

  async card(id: number): Promise<Card> {
    return await this.cardRepository.findOne({ where: { id: id } });
  }

  async cardsLength() {
    return await this.cardRepository.count();
  }

  async getRandomCard() {
    const cards = await this.cardsList();
    const totalWeight = cards.reduce((total, card) => total + 1 / card.rarity, 0);
    let random = Math.random() * totalWeight;

    for (const card of cards) {
      const weight = 1 / card.rarity;
      if (random < weight) {
        return card;
      }
      random -= weight;
    }

    return cards[0];
  }

  async createCard(data: CardCreateDto, userID: number): Promise<ResultDto> {
    const user = await this.userService.findById(userID);
    const card = new Card();

    card.nome = data.nome;
    card.tipo = data.tipo;
    card.atk = data.atk;
    card.def = data.def;
    card.hp = data.hp;
    card.rarity = data.rarity;
    card.special_ability = data.special_ability;
    card.created_at = new Date();

    if (user.type != 'admin') {
      return <ResultDto>{
        status: false,
        message: 'usuário sem permissão',
        result: null,
      };
    }

    if (
      await this.cardRepository.findOne({
        where: { nome: data.nome },
      })
    ) {
      return <ResultDto>{
        status: false,
        message: 'carta ja existe',
        result: null,
      };
    }

    try {
      await this.cardRepository.save(card);
      await this.LogService.cadastrar({
        logDate: new Date(),
        logMessage: 'cadastrou a carta ' + data.nome,
        logType: 'perola',
        user: user,
      });
      return <ResultDto>{
        status: true,
        message: 'carta criada com sucesso',
        result: card,
      };
    } catch (error) {
      console.log(error);
      return <ResultDto>{
        status: false,
        message: 'erro ao criar carta',
        result: null,
      };
    }
  }

  async deleteCard(id: number, userID: number): Promise<ResultDto> {
    const user = await this.userService.findById(userID);
    if (user.type != 'admin') {
      return <ResultDto>{
        status: false,
        message: 'usuário sem permissão',
        result: null,
      };
    }
    try {
      await this.cardRepository.delete(id);
      await this.LogService.cadastrar({
        logDate: new Date(),
        logMessage: 'deletou a carta ' + id,
        logType: 'perola',
        user: user,
      });
      return <ResultDto>{
        status: true,
        message: 'carta deletada com sucesso',
        result: null,
      };
    } catch (error) {
      console.log(error);
      return <ResultDto>{
        status: false,
        message: 'erro ao deletar carta',
        result: null,
      };
    }
  }

  async createMultipleCards(data: CardCreateDto[], userID: number): Promise<ResultDto> {
    const user = await this.userService.findById(userID);
    if (user.type != 'admin') {
      return <ResultDto>{
        status: false,
        message: 'usuário sem permissão',
        result: null,
      };
    }
    try {
      for (const card of data) {
        await this.createCard(card, userID);
      }
      return <ResultDto>{
        status: true,
        message: 'cartas criadas com sucesso',
        result: null,
      };
    } catch (error) {
      console.log(error);
      return <ResultDto>{
        status: false,
        message: 'erro ao criar cartas',
        result: null,
      };
    }
  }
}

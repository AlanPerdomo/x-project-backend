import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CardCreateDto } from './dto/card.crate.dto';
import { ResultDto } from 'src/dto/result.dto';

@Injectable()
export class CardService {
  constructor(
    @Inject('CARD_REPOSITORY')
    private cardRepository: Repository<Card>,
  ) {}

  async cardsList() {
    return await this.cardRepository.find();
  }

  async createCard(data: CardCreateDto): Promise<ResultDto> {
    const card = new Card();

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

    card.nome = data.nome;
    card.tipo = data.tipo;
    card.atk = data.atk;
    card.def = data.def;
    card.hp = data.hp;
    card.rarity = data.rarity;
    card.special_ability = data.special_ability;

    console.log(card);

    try {
      // await this.cardRepository.save(card);
      return <ResultDto>{
        status: true,
        message: 'carta criada com sucesso',
        result: null,
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
}

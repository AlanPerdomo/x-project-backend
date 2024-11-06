import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deck } from './deck.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  tipo: string;

  @Column()
  atk: number;

  @Column()
  def: number;

  @Column()
  hp: number;

  @Column({ nullable: true })
  rarity: number;

  @Column({ length: 255 })
  special_ability: string;

  @OneToMany(() => Deck, deck => deck.card)
  deck: Deck[];

  @Column()
  created_at: Date;
}

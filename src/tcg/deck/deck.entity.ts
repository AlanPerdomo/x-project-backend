import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Card } from 'src/tcg/card/card.entity';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.deck)
  user: User;

  @ManyToOne(() => Card, card => card.deck)
  card: Card;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  created_at: Date;
}

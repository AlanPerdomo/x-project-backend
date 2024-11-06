import { Log } from 'src/log/log.entity';
import { Perola } from 'src/perolas/perola.entity';
import { Token } from 'src/token/token.entity';
import { Deck } from 'src/tcg/deck.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  firstAcess: boolean;

  @Column({ unique: true })
  discordId: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  type: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Perola, perola => perola.user)
  perolas: Perola[];

  @OneToMany(() => Log, log => log.user)
  logs: Log[];

  @OneToMany(() => Deck, deck => deck.user)
  deck: Deck[];

  @OneToOne(() => Token, token => token.user)
  token: Token;
}

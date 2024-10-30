import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Perola {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  perola: string;

  @Column({ length: 100 })
  date: string;

  @Column({ nullable: true })
  guildId: string;

  @Column({ nullable: true })
  channelId: string;

  @ManyToOne(() => User, user => user.perolas)
  user: User;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

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

  @Column({ nullable: true })
  createdAt: Date;

  @ManyToOne(() => User, user => user.perolas)
  user: User;
}

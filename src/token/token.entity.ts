import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  hash: string;

  @OneToOne(() => User, user => user.token)
  @JoinColumn()
  user: User;
}

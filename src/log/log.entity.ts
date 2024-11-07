import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logMessage: string;

  @Column()
  logDate: Date;

  @Column()
  logType: string;

  @ManyToOne(() => User, user => user.logs)
  user: User;
}

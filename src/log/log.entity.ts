import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('log')
export class Log {
  @PrimaryColumn()
  id: number;

  @Column()
  logMessage: string;

  @Column()
  logDate: Date;

  @ManyToOne(() => User, user => user.logs)
  user: User;
}

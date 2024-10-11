import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Perola {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    perola: string;

    @Column({length: 100})
    date: string;

    @ManyToOne(() => User, user => user.perolas)
    user: User;
}
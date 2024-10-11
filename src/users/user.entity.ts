import { Perola } from "src/perolas/perola.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    email: string;

    @OneToMany(() => Perola, perola => perola.user)
    perolas: Perola[]
}
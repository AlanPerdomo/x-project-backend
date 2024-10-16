import { Perola } from "src/perolas/perola.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    discordId: string;

    @Column({length: 100})
    name: string;

    @Column({length: 100, nullable: true})
    username: string;

    @Column({length: 100, nullable: true})
    email: string;

    @Column({length: 100, nullable: true})
    password: string;

    @Column({length: 100, nullable: true})
    type: string;

    @OneToMany(() => Perola, perola => perola.user)
    perolas: Perola[]
}
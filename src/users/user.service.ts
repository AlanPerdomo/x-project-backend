import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ){}

    async listar(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async cadastrar(): Promise<User> {
        return await this.userRepository.save({
            name: "teste",
            email: "teste",   
        });
}}
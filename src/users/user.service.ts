import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserCreateDto } from "./dto/user.create.dto";
import { ResultDto } from "src/dto/result.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ){}

    async listar(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async cadastrar(data: UserCreateDto): Promise<ResultDto> {
       console.log(data.password);

        let user = new User();
        user.name = data.name;
        user.discordId = data.discordId;
        user.username = data.username;
        user.email = data.email || "";
        user.password = bcrypt.hashSync(data.password, 10);
        user.type = data.type || "user";

        return this.userRepository.save(user)
        .then((result) => {
            return <ResultDto>{
                status: true,
                message: "Usuário criado com sucesso!",
                result: result
            }}).catch((error) => {
                return <ResultDto>{
                    status: false,
                    message: "Erro ao criar o usuário!",
                    result: error
                }
            });
    }

    async findOne(email: string): Promise<User| undefined> {
        return this.userRepository.findOne({where: {email: email}});
    }
}
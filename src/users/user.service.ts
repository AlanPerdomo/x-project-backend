import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserCreateDto } from "./dto/user.create.dto";
import { ResultDto } from "src/dto/result.dto";

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
        const user = new User();
        user.name = data.name;
        user.password = data.password || null;
        user.type = data.type || "user";
        user.email = data.email;

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
}
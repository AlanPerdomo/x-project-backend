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
    
        let user = new User();
        user.name = data.name;
        user.discordId = data.discordId;
        user.username = data.username ? data.username : null;
        user.email = data.email ? data.email : null;
        user.password = data.password ? bcrypt.hashSync(data.password, 10): null;
        user.type = data.type ? data.type : null;

        if(await this.findByDiscordId(data.discordId) && user.discordId != "") {
            try {
                if (!await this.findByEmail(data.email)) {
                    return await this.userRepository.update({discordId: data.discordId}, user).then((result) => {
                        return <ResultDto>{
                            status: true,
                            message: "Usuário atualizado com sucesso!",
                            result: result
                        } 
                    })   
                } else {
                    return <ResultDto>{
                        status: false,
                        message: "usuario ja existente!",
                        result: null
                    }
                }
            } catch (error) {
                return <ResultDto>{
                    status: false,
                    message: "Erro ao atualizar o usuário!",
                    result: error
                }
            }
        }else {
            return this.userRepository.save(user)
            .then((result) => {
                console.log("result", result)
                return <ResultDto>{
                    status: true,
                    message: "Usuário criado com sucesso!",
                }}).catch((error) => {
                    return <ResultDto>{
                        status: false,
                        message: "Erro ao criar o usuário!",
                        result: error
                    }
                });
            }
        }   
            
    async findOne(email: string): Promise<User| undefined> {
        return this.userRepository.findOne({where:{email: email}});
    }

    async findByDiscordId(discordId: string): Promise<User| undefined> {
        return this.userRepository.findOne({where:{discordId: discordId}});
    }

    async findByEmail(email: string): Promise<User| undefined> {
        return this.userRepository.findOne({where:{email: email}});
    }

    async updatePassword(user: User, password: string): Promise<User> {
        user.password = bcrypt.hashSync(password, 10);
        return this.userRepository.save(user);
    }

}
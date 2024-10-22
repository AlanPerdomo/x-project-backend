import { Injectable, Inject } from "@nestjs/common";
import { ResultDto } from "src/dto/result.dto";
import { Repository } from "typeorm";
import { Perola } from "./perola.entity";
import { PerolaCreateDto } from "./dto/perola.create.dto";
import { UserService } from "src/users/user.service";


@Injectable()
export class PerolaService {
    constructor(
        @Inject("PEROLA_REPOSITORY")
        private perolaRepository: Repository<Perola>,
        private userService: UserService
    ) {}

    async listar(): Promise<Perola[]> {
        return await this.perolaRepository.find();
    }

    async cadastrar(data: PerolaCreateDto): Promise<ResultDto> {
        const perola = new Perola();

        if(!await this.userService.findByDiscordId(data.userId.toString()) 
            && data.userId && data.username && data.name) {
            await this.userService.cadastrar({
                    discordId: data.userId,
                    name: data.name,
                    username: data.username,
                }
            );
        }

        perola.perola = data.perola;
        perola.date = data.date ? data.date : Date.now().toString();
        perola.user =  data.userId ? await this.userService.findByDiscordId(data.userId.toString()) : null;
        perola.guildId = data.guildId ? data.guildId : null;
        perola.channelId = data.channelId ? data.channelId : null;

        try{
            await this.perolaRepository.save(perola);
            return <ResultDto>{
                status: true,
                message: "Perola criada com sucesso!",
            }
        } catch (error) {
            return <ResultDto>{
                status: false,
                message: "Erro ao criar a perola!",
                result: error
            }
        }
    }
}
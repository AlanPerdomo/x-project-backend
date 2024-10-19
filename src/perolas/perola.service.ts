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
        

        perola.perola = data.perola;
        perola.date = data.date || Date.now().toString();
        perola.user =  !data.userId ? null : await this.userService.findByDiscordId(data.userId.toString());
        perola.guildId = data.guildId;
        perola.channelId = data.channelId;

        try{
            const result = await this.perolaRepository.save(perola);
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
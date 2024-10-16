import { Injectable, Inject } from "@nestjs/common";
import { ResultDto } from "src/dto/result.dto";
import { Repository } from "typeorm";
import { Perola } from "./perola.entity";
import { PerolaCreateDto } from "./dto/perola.create.dto";


@Injectable()
export class PerolaService {
    constructor(
        @Inject("PEROLA_REPOSITORY")
        private perolaRepository: Repository<Perola>,
    ) {}

    async listar(): Promise<Perola[]> {
        return await this.perolaRepository.find();
    }

    async cadastrar(data: PerolaCreateDto): Promise<ResultDto> {
        const perola = new Perola();
        perola.perola = data.perola;
        perola.date = data.date || Date.now().toString();
        perola.user = data.user;

        return this.perolaRepository.save(perola).then((result) => {
            return <ResultDto>{
                status: true,
                message: "Perola criada com sucesso!",
                result: result
            }
        }).catch((error) => {
            return <ResultDto>{
                status: false,
                message: "Erro ao criar a perola!",
                result: error
            }
        });
    }
   
}
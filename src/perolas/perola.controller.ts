import { Get, Controller, Post, Body } from "@nestjs/common";
import { PerolaService } from "./perola.service";
import { Perola } from "./perola.entity";
import { PerolaCreateDto } from "./dto/perola.create.dto";
import { ResultDto } from "src/dto/result.dto";

@Controller('perolas')
export class PerolaController {
    constructor(private readonly perolaService: PerolaService) {}

    @Get('listar')
    async listar(): Promise<Perola[]> {
        return await this.perolaService.listar();
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: PerolaCreateDto): Promise<ResultDto> {
        return await this.perolaService.cadastrar(data);
    }
}
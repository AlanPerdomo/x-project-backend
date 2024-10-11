import { Module } from "@nestjs/common";
import { perolaProviders } from "./perola.providers";
import { PerolaService } from "./perola.service";
import { DatabaseModule } from "src/database/database.module";
import { PerolaController } from "./perola.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [PerolaController],
    providers: [...perolaProviders,PerolaService],
    exports: [PerolaService],
})
export class PerolaModule {}
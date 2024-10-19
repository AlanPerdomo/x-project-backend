import { Module, forwardRef } from "@nestjs/common";
import { perolaProviders } from "./perola.providers";
import { PerolaService } from "./perola.service";
import { DatabaseModule } from "src/database/database.module";
import { PerolaController } from "./perola.controller";
import { UserModule } from "src/users/user.module";
import { AppModule } from "src/app.module";

@Module({
    imports: [DatabaseModule, forwardRef(() => UserModule)],
    controllers: [PerolaController],
    providers: [...perolaProviders,PerolaService],
    exports: [PerolaService],
})
export class PerolaModule {}
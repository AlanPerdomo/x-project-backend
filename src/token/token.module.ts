import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { TokenService } from "./token.service";
import { tokenProviders } from "./token.providers";
import { AuthModule } from "src/auth/auth.module";
import { TokenController } from "./token.controller";
import { UserModule } from "src/users/user.module";


@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule),UserModule],
    controllers: [TokenController],
    providers: [...tokenProviders, TokenService],
    exports: [TokenService]
})
export class TokenModule {}
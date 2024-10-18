import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Token } from "./token.entity";
import { UserService } from "src/users/user.service";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class TokenService {
    constructor(
        @Inject("TOKEN_REPOSITORY")
        private tokenRepository: Repository<Token>,
        private userService: UserService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    )
     {}

    async save(hash: string, username: string){
        let objToken= await this.tokenRepository.findOne({where:{username: username}});
        if(objToken){
            objToken.hash = hash;
            this.tokenRepository.save(objToken);
        }else{
            this.tokenRepository.insert({hash, username});
        }
    }

    async refreshToken(oldToken: string){
        let objToken = await this.tokenRepository.findOne({where:{hash: oldToken}});
        if(objToken){
            let user = await this.userService.findOne(objToken.username);
            return await this.authService.login(user);
        }else{
            return new HttpException({
                errorMessage: "Token inválido!",                
            }, HttpStatus.UNAUTHORIZED);
        }
    }
}
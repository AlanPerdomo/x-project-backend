import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Token } from "./token.entity";


@Injectable()
export class TokenService {
    constructor(
        @Inject("TOKEN_REPOSITORY")
        private tokenRepository: Repository<Token>,
    ) {}

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
            return oldToken;
        }else{
            return new HttpException({
                errorMessage: "Token inválido!",                
            }, HttpStatus.UNAUTHORIZED);
        }
    }
}
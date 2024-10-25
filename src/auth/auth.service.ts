import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/user.entity';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private jwtService: JwtService,
        private tokenService: TokenService
    ) {}
    async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...result } = user;
        return result;
    }
    return null;
    }

    async login(user: any) {
        console.log(user);
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        this.tokenService.save(token, (await this.userService.findByEmail(user.email)));      
        return {
            access_token: token,
        };
    }

    async logout(user: any) {
        await this.tokenService.deleteByHash(user.hash);
    }  
}
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async save(hash: string, user: User) {
    const objToken = await this.tokenRepository.findOne({ where: { user: user } });
    if (objToken) {
      objToken.hash = hash;
      this.tokenRepository.save(objToken);
    } else {
      this.tokenRepository.insert({ hash, user: user });
    }
  }

  async refreshToken(userToken: string, userId: number) {
    const objToken = await this.tokenRepository.findOne({ where: { hash: userToken } });
    objToken.user = await this.userService.findById(userId);
    if (objToken) {
      return await this.authService.login(objToken.user);
    }
  }

  // async refreshToken() {
  //   const objToken = await this.tokenRepository.findOne({ where: { hash: oldToken } });
  //   objToken.user = await this.userSercice.findByDiscordId(data.discordId);
  //   console.log(objToken.user);
  //   if (objToken) {
  //     return await this.authService.login(objToken.user);
  //   }
  // }

  async findOne(data: { hash: string; discordId: string }) {
    if (!data.hash || data.hash == '') return { status: false, message: 'Token não informado!' };
    if (data.hash == process.env.BOT_SERVICE_TOKEN) {
      const userId = (await this.userService.findByDiscordId(data.discordId)).id;
      const userToken = (await this.findByUserId(userId)).hash;
      try {
        const newToken = await this.refreshToken(userToken, userId);
        return newToken;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteByHash(hash: string) {
    const objToken = await this.tokenRepository.findOne({ where: { hash: hash } });
    if (objToken) {
      this.tokenRepository.delete({ id: objToken.id });
      console.log('\nToken deletado!');
      return {
        status: true,
        message: 'Usuario deslogado com sucesso!',
      };
    }
  }
  async findByUserId(id: number) {
    return await this.tokenRepository.findOne({ where: { user: { id: id } } });
  }
}

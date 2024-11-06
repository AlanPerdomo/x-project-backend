import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { UserService } from 'src/users/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
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

  async refreshToken(oldToken: string) {
    const objToken = await this.tokenRepository.findOne({ where: { hash: oldToken } });
    if (objToken) {
      return await this.authService.login(objToken.user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Token inválido!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async deleteByHash(hash: string) {
    const objToken = await this.tokenRepository.findOne({ where: { hash: hash } });
    console.log(objToken);
    if (objToken) {
      this.tokenRepository.delete({ id: objToken.id });
      console.log('Token deletado!');
      return {
        status: true,
        message: 'Usuario deslogado com sucesso!',
      };
    } else {
      console.log('Token inválido!');
      return {
        success: false,
        message: 'Token inválido!',
      };
    }
  }
}

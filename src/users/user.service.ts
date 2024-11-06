import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user.create.dto';
import { ResultDto } from 'src/dto/result.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async listar(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async cadastrar(data: UserCreateDto): Promise<ResultDto> {
    const date = new Date();

    const user = new User();
    user.name = data.name;
    user.discordId = data.discordId;
    user.username = data.username ? data.username : null;
    user.email = data.email ? data.email : null;
    user.password = data.password ? bcrypt.hashSync(data.password, 10) : null;
    user.type = data.type ? data.type : null;
    user.updatedAt = date;

    if ((await this.findByDiscordId(data.discordId)) && user.discordId != '') {
      try {
        if (!(await this.findByEmail(data.email))) {
          return await this.userRepository.update({ discordId: data.discordId }, user).then(result => {
            return <ResultDto>{
              status: true,
              message: 'Usuário atualizado com sucesso!',
              result: result,
            };
          });
        } else {
          return <ResultDto>{
            status: false,
            message: 'usuario ja existente!',
            result: null,
          };
        }
      } catch (error) {
        return <ResultDto>{
          status: false,
          message: 'Erro ao atualizar o usuário!',
          result: error,
        };
      }
    } else {
      user.createdAt = date;
      return this.userRepository
        .save(user)
        .then(result => {
          console.log('result', result);
          return <ResultDto>{
            status: true,
            message: 'Usuário criado com sucesso!',
          };
        })
        .catch(error => {
          console.log('error', error);
          return <ResultDto>{
            status: false,
            message: 'Erro ao criar o usuário!',
            result: error,
          };
        });
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findByDiscordId(discordId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { discordId: discordId } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async getEmail(id: number): Promise<string> {
    return (await this.userRepository.findOne({ where: { id: id } })).email;
  }

  async updatePassword(user: User, password: string): Promise<ResultDto> {
    user.password = bcrypt.hashSync(password, 10);
    return await this.userRepository
      .update({ id: user.id }, user)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(async _result => {
        return <ResultDto>{
          status: true,
          message: 'Senha atualizada com sucesso!',
        };
      })
      .catch(error => {
        return <ResultDto>{
          status: false,
          message: 'Erro ao atualizar a senha!',
          result: error,
        };
      });
  }
}

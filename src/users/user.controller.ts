import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user.create.dto';
import { ResultDto } from 'src/dto/result.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('listar')
    async listar(): Promise<User[]> {
        return await this.userService.listar();
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: UserCreateDto): Promise<ResultDto> {
        return this.userService.cadastrar(data);
    }
}
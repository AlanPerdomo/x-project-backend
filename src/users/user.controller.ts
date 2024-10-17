import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultDto } from 'src/dto/result.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService, 
        private authService: AuthService
    ) {}
    @UseGuards(AuthGuard('jwt'))
    @Get('listar')
    async listar(): Promise<User[]> {
        return await this.userService.listar();
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: UserCreateDto): Promise<ResultDto> {
        return this.userService.cadastrar(data);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
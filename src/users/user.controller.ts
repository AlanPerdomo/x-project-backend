import { Body, Controller, Get, Post, UseGuards, Request, Delete } from '@nestjs/common';
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
    private authService: AuthService,
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

  @UseGuards(AuthGuard('jwt'))
  @Post('update-password')
  async updatePassword(@Request() req, @Body() data: UserCreateDto): Promise<ResultDto> {
    console.log(req);
    return this.userService.updatePassword(req.user, data.password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('login');
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  async logout(@Request() req) {
    console.log('Logout');
    return this.authService.logout(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}

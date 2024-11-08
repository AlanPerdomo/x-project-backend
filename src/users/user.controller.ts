import { Body, Controller, Get, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResultDto } from 'src/dto/result.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LogService } from 'src/log/log.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private readonly LogService: LogService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('listar')
  async listar(): Promise<User[]> {
    return await this.userService.listar();
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: UserCreateDto): Promise<ResultDto> {
    await this.LogService.cadastrar({
      logMessage: 'cadastrou o user ' + data.name,
      user: await this.userService.findByDiscordId(data.discordId),
      logDate: new Date(),
      logType: 'user',
    });
    return this.userService.cadastrar(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update-password')
  async updatePassword(@Request() req, @Body() data: UserCreateDto): Promise<ResultDto> {
    await this.LogService.cadastrar({
      logMessage: 'atualizou a senha do user ' + req.user.id,
      user: req.user,
      logDate: new Date(),
      logType: 'user',
    });
    return this.userService.updatePassword(req.user, data.password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    await this.LogService.cadastrar({
      logMessage: 'logou o user ' + req.user.id,
      user: req.user,
      logDate: new Date(),
      logType: 'user',
    });
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  async logout(@Request() req) {
    await this.LogService.cadastrar({
      logMessage: 'deslogou o user ' + req.user.id,
      user: req.user,
      logDate: new Date(),
      logType: 'user',
    });
    return this.authService.logout(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}

import {
  Body,
  Controller,
  Post,
  // Put
} from '@nestjs/common';
// import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  // @Put('refresh')
  // async refreshToken(@Body() data: RefreshTokenDto) {
  //   return this.tokenService.refreshToken(data.oldToken);
  // }

  @Post('get-user-token')
  async getUserToken(@Body() data: { hash: string; discordId: string }) {
    return this.tokenService.findOne(data);
  }
}

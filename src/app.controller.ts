import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Get()
  getHello(@Res() response: Response): void {
    this.appService.getHello(response);
  }

  @Get('hello1')
  getHello1(): string {
    return this.appService.getHello1();
  }
}


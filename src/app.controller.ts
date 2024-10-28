import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Get()
  getHello(@Res() response: Response): void {
    this.appService.getHello(response);
  }
}


import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  getHello(response: Response): void {
    const filePath = join(__dirname, '..', 'public', 'heimer.html');
    const htmlContent = readFileSync(filePath, 'utf-8');
    response.send(htmlContent);
  }

  getHello1(): string {
    return ('Hello World1!');
  }
}

import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //IMPLICITO HACIA LA RAIZ
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
  @HttpCode(200)
  helloText(): string {
    return 'Hola Texto';
  }
  @Get('html')
  @HttpCode(201)
  HelloHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }
  @Get('json')
  @HttpCode(200)
  helloJson(): string {
    return '{mensaje: "Hola JSON"}';
  }
}

import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Req,
  Res,
} from '@nestjs/common';
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
  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }
  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }
  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //request - PETICION
    @Res() res, //response - RESPUESTA
  ) {
    //nombre            valor
    res.cookie('cookieInsegura', 'esto esta inseguro oe');
    res.cookie('cookieSegura', 'esto esta seguro :)', { secure: true });
    res.send('ok');
  }
  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje;
  }
}

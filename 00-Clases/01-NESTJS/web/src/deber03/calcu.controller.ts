import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';

@Controller('calculadora')
export class CalcuController {
  //EXAMPLE
  //http://localhost:3001/calculadora/suma?numUno=2&numDos=3&nombre=Cesarin
  @Get('suma') //QUERY PARAMS
  @HttpCode(200)
  sumar(
    @Query()
    queryParams,
    @Req()
    request,
    @Res({ passthrough: true })
    response,
  ) {
    const cookieTemporal = request.cookies;
    const userName = queryParams.nombre;
    let cookieValue = cookieTemporal[userName];
    if (!userName || cookieTemporal[userName] == undefined) {
      return 'Error en envio del nombre de usario o crear uno nuevo';
    }
    const result = parseInt(queryParams.numUno) + parseInt(queryParams.numDos);
    cookieValue = cookieValue - result;
    if (cookieValue < 0) {
      this.deleteCookie(response, userName);
      return 'TERMINASTE EL JUEGO';
    } else {
      response.cookie(userName, cookieValue);
      return 'SUMA = ' + result + ', te quedan: ' + cookieValue + ' puntos';
    }
  }

  @Post('resta') //BODY PARAMS
  @HttpCode(201)
  @Header('Resultado', 'valor')
  restar(
    @Body() bodyParams,
    @Res({ passthrough: true })
    response,
    @Headers() headers,
    @Req()
    request,
  ) {
    const cookieTemporal = request.cookies;
    const userName = bodyParams.nombre;
    let cookieValue = cookieTemporal[userName];
    if (!userName || cookieTemporal[userName] == undefined) {
      return 'Error en envio del nombre de usario o crear uno nuevo';
    }
    const result = bodyParams.numeroUno - bodyParams.numeroDos;
    cookieValue = cookieValue - result;
    if (cookieValue < 0) {
      this.deleteCookie(response, userName);
      return 'TERMINASTE EL JUEGO';
    } else {
      response.cookie(userName, cookieValue);
      response.header('Resultado', result);
      return 'RESTA = ' + result + ', te quedan: ' + cookieValue + ' puntos';
    }
  }

  @Put('multiplicar/:numeroUno/:numeroDos/:nombre') //ROUTE PARAMS
  @HttpCode(200)
  multiplicar(
    @Param() routeParams,
    @Res({ passthrough: true })
    response,
    @Req()
    request,
  ) {
    const cookieTemporal = request.cookies;
    const userName = routeParams.nombre;
    let cookieValue = cookieTemporal[userName];
    if (!userName || cookieTemporal[userName] == undefined) {
      return 'Error en envio del nombre de usario o crear uno nuevo';
    }
    const result =
      parseInt(routeParams.numeroUno) * parseInt(routeParams.numeroDos);
    cookieValue = cookieValue - result;
    if (cookieValue < 0) {
      this.deleteCookie(response, userName);
      return 'TERMINASTE EL JUEGO';
    } else {
      response.cookie(userName, cookieValue);
      return (
        'MULTIPLICACION = ' + result + ', te quedan: ' + cookieValue + ' puntos'
      );
    }
  }

  @Get('dividir') //HEADERS
  @HttpCode(201)
  dividir(
    @Req()
    request,
    @Headers()
    hearderParams,
    @Res({ passthrough: true })
    response,
  ) {
    const cookieTemporal = request.cookies;
    const userName = hearderParams.nombre;
    let cookieValue = cookieTemporal[userName];
    if (!userName || cookieTemporal[userName] == undefined) {
      return 'Error en envio del nombre de usario o crear uno nuevo';
    }
    const result = hearderParams.numero1 / hearderParams.numero2;
    cookieValue = cookieValue - result;
    if (cookieValue < 0) {
      this.deleteCookie(response, userName);
      return 'TERMINASTE EL JUEGO';
    } else {
      response.cookie(userName, cookieValue);
      return 'DIVISION = ' + result + ', te quedan: ' + cookieValue + ' puntos';
    }
  }

  @Get('configurarUsuario/:nombre')
  setUserName(
    @Param()
    parametrosRuta,
    @Req()
    request,
    @Res({ passthrough: true })
    response,
  ) {
    console.log(response.cookie.nombre);
    response.cookie();
    response.cookie(parametrosRuta.nombre, 100);
    response.cookie('nombre', parametrosRuta.nombre);
    return 'Cookie: ' + parametrosRuta.nombre + ' seteada';
  }

  @Get('deleteCookie/:nombre')
  borrarCookie(
    @Param()
    parametrosRuta,
    @Req()
    request,
    @Res({ passthrough: true })
    response,
  ) {
    const date = new Date();
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    response.clearCookie(parametrosRuta.nombre);
    return 'Cookie: ' + parametrosRuta.nombre + ' eliminada';
  }

  deleteCookie(
    @Res({ passthrough: true })
    response,
    nombre,
  ) {
    const date = new Date();
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    response.clearCookie(nombre);
  }
}

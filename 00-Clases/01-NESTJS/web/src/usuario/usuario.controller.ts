import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

// hpttp://localhost:3000/usuario/
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Get(':idUsuario')
  obtenerUno(@Param() parametroRuta) {
    return this.usuarioService.buscarUno(+parametroRuta.idUsuario);
  }
  @Post(':idUsuario')
  obtenerOtro(@Param() parametroRuta) {
    return this.usuarioService.buscarUno(+parametroRuta.idUsuario);
  }
  @Put(':idUsuario')
  actualizarUno(@Param() parametroRuta) {
    return this.usuarioService.actualizarUno(parametroRuta.idUsuario);
  }
  @Delete(':idusuario')
  borrarUno(@Param() parametroRuta) {
    return this.usuarioService.elimnarUno(parametroRuta.idUsuario);
  }
}

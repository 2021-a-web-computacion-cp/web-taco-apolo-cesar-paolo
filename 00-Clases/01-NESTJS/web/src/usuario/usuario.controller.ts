import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { validate } from 'class-validator';

// hpttp://localhost:3000/usuario/
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('vista-crear')
  vistaCrear(@Res() response) {
    response.render('usuario/crear');
  }

  @Get('lista-usuarios')
  async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
    try {
      //Validar parametros de consulta con un DTO (TODO)
      const respuesta = await this.usuarioService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('usuario/lista', {
        datos: {
          usuarios: respuesta,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get(':idUsuario')
  obtenerUno(@Param() parametroRuta) {
    return this.usuarioService.buscarUno(+parametroRuta.idUsuario);
  }

  @Post(':idUsuario')
  async crearUno(@Body() parametrosCuerpo) {
    const usuarioCrearDTO = new UsuarioCrearDto();
    usuarioCrearDTO.nombre = parametrosCuerpo.nombre;
    usuarioCrearDTO.apellido = parametrosCuerpo.apellido;
    usuarioCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
    try {
      const error = await validate(usuarioCrearDTO);
      if (error.length > 0) {
        console.log(JSON.stringify(error));
        throw new BadRequestException('no envia bien parametros');
      } else {
        return this.usuarioService.crearUno(usuarioCrearDTO);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear usuario' });
      throw new InternalServerErrorException('error servidor');
    }
  }

  @Put(':idUsuario')
  actualizarUno(@Param() parametroRuta) {
    //se utiliza los parametros de cuerpo y de ruta
    return this.usuarioService.actualizarUno(parametroRuta.idUsuario);
  }

  @Delete(':idUsuario')
  borrarUno(@Param() parametroRuta) {
    //se utiliza los parametros de ruta
    return this.usuarioService.eliminarUno(parametroRuta.idUsuario);
  }
}

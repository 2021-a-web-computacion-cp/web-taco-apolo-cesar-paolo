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
import { MotoService } from './moto.service';
import { MotoCrearDto } from './dto/moto-crear.dto';
import { validate } from 'class-validator';
import { MotoEditarDto } from './dto/moto-editar.dto';

// hpttp://localhost:3000/usuario/
@Controller('moto')
export class MotoController {
  constructor(private motoService: MotoService) {}

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() qqueryParams) {
    response.render('moto/crear-moto', {
      datos: {
        mensaje: qqueryParams.mensaje,
      },
    });
  }

  @Post('crear-moto-formulario')
  async crearUsuario(@Res() response, @Body() bodyParams) {
    try {
      const motoRes = await this.motoService.crearUno({
        nombre: bodyParams.nombre,
        marca: bodyParams.marca,
        cilindraje: +bodyParams.cilindraje,
        kilometraje: +bodyParams.kilometraje,
        anio: +bodyParams.anio,
        precio: +bodyParams.precio,
      });
      //response.send(userRes); -> ENVIA LA BASE LOS DATOS PERO DEVUELVE JSON
      response.redirect(
        '/moto/vista-crear' +
          '?mensaje=Se creo el registro: ' +
          bodyParams.nombre,
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get('lista-motos')
  async listaMotos(@Res() response, @Query() parametrosConsulta) {
    try {
      //Validar parametros de consulta con un DTO (TODO)
      //   const motoCrearDTO = new MotoCrearDto();
      //   motoCrearDTO.sk
      const respuesta = await this.motoService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('moto/lista-moto', {
        datos: {
          moto: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Post('eliminar-moto/:idMoto')
  async elminarMoto(@Res() response, @Param() routeParams) {
    try {
      await this.motoService.eliminarUno(+routeParams.idMoto);
      response.redirect(
        '/moto/lista-motos' + '?mensaje=Se elimino el registro',
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Post('vista-editar/:idMoto')
  async vistaEditar(@Res() response, @Param() parametrosRuta) {
    try {
      const motoEditar = await this.motoService.buscarUno(
        +parametrosRuta.idMoto,
      );
      response.render('moto/editar-moto', {
        datos: {
          moto: motoEditar,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Editar');
    }
  }

  @Post('editar-moto-formulario/:idMoto')
  async actualizarMoto(
    @Res() response,
    @Body() bodyParams,
    @Param() parametrosRuta,
  ) {
    const motoEditar = new MotoEditarDto();
    motoEditar.nombre = bodyParams.nombre;
    motoEditar.marca = bodyParams.marca;
    motoEditar.cilindraje = +bodyParams.cilindraje;
    motoEditar.kilometraje = +bodyParams.kilometraje;
    motoEditar.anio = +bodyParams.anio;
    motoEditar.precio = +bodyParams.precio;
    console.log(motoEditar);
    console.log(parametrosRuta.idMoto);
    console.log(bodyParams.idMoto);
    try {
      const errores = await validate(motoEditar);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        return response.redirect(
          '/moto/lista-motos/' + '?mensaje=Error validando datos',
        );
      } else {
        await this.motoService.actualizarUno({
          id: +parametrosRuta.idMoto,
          data: motoEditar,
        });
        response.redirect(
          '/moto/vista-crear' +
            '?mensaje=Se editó el registro: ' +
            bodyParams.nombre,
        );
        console.log(parametrosRuta.idMoto);
        console.log(bodyParams.idMoto);
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Get(':idMoto')
  obtenerUno(@Param() parametroRuta) {
    return this.motoService.buscarUno(+parametroRuta.idMoto);
  }

  @Post(':idMoto')
  async crearUno(@Body() parametrosCuerpo) {
    const motoCrearDTO = new MotoCrearDto();
    motoCrearDTO.nombre = parametrosCuerpo.nombre;
    motoCrearDTO.marca = parametrosCuerpo.marca;
    motoCrearDTO.cilindraje = parametrosCuerpo.cilindraje;
    motoCrearDTO.kilometraje = parametrosCuerpo.kilometraje;
    motoCrearDTO.anio = parametrosCuerpo.anio;
    motoCrearDTO.precio = parametrosCuerpo.precio;
    motoCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
    try {
      const error = await validate(motoCrearDTO);
      if (error.length > 0) {
        console.log(JSON.stringify(error));
        throw new BadRequestException('no envia bien parametros');
      } else {
        return this.motoService.crearUno(motoCrearDTO);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear moto' });
      throw new InternalServerErrorException('error servidor');
    }
  }

  @Put(':idMoto')
  actualizarUno(@Param() parametroRuta) {
    //se utiliza los parametros de cuerpo y de ruta
    return this.motoService.actualizarUno(parametroRuta.idMoto);
  }

  @Delete(':idMoto')
  borrarUno(@Param() parametroRuta) {
    //se utiliza los parametros de ruta
    return this.motoService.eliminarUno(parametroRuta.idMoto);
  }
}

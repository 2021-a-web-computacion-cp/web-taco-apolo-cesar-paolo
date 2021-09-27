import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MotoService {
  constructor(private prisma: PrismaService) {}
  buscarUno(id: number) {
    return this.prisma.moto.findUnique({ where: { id: id } });
  }
  buscarMuchos(parametrosBusqueda: {
    skip?: number; //Registros que te saltas
    take?: number; //Registros que tomas
    busqueda?: string; // Lo que el usuario busca
    // orderBy?: Prisma.EPN_UsuarioOrder;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { marca: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.moto.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }
  crearUno(moto: Prisma.MotoCreateInput) {
    return this.prisma.moto.create({ data: moto });
  }
  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.MotoUpdateInput;
  }) {
    return this.prisma.moto.update({
      data: parametrosActualizar.data,
      where: {
        id: +parametrosActualizar.id,
      },
    });
  }
  eliminarUno(id: number) {
    return this.prisma.moto.delete({
      where: { id: id },
    });
  }
}

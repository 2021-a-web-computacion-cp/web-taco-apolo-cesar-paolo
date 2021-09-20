import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  buscarUno(id: number) {
    return this.prisma.ePN_USUARIO.findUnique({ where: { id: id } });
  }
  buscarMuchos(searchParams: {
    skip?: number;
    take?: number; //orderBy?: Prisma.EPN_USUARIO
    busqueda?: string;
  }) {
    const or = searchParams.busqueda
      ? {
          OR: [
            { nombre: { contains: searchParams.busqueda } },
            { apellido: { contains: searchParams.busqueda } },
          ],
        }
      : {};
    this.prisma.ePN_USUARIO.findMany({
      where: or,
      take: Number(searchParams.take) || undefined,
      skip: Number(searchParams.skip) || undefined,
    });
  }
  crearUno(usuario: Prisma.EPN_USUARIOCreateInput) {
    return this.prisma.ePN_USUARIO.create({ data: usuario });
  }
  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.EPN_USUARIOUpdateInput;
  }) {
    return this.prisma.ePN_USUARIO.update({
      data: parametrosActualizar.data,
      where: {
        id: parametrosActualizar.id,
      },
    });
  }
  eliminarUno(id: number) {
    return this.prisma.ePN_USUARIO.delete({
      where: { id: id },
    });
  }
}

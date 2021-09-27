import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class MotoService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__MotoClient<import(".prisma/client").Moto>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Moto[]>;
    crearUno(moto: Prisma.MotoCreateInput): Prisma.Prisma__MotoClient<import(".prisma/client").Moto>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.MotoUpdateInput;
    }): Prisma.Prisma__MotoClient<import(".prisma/client").Moto>;
    eliminarUno(id: number): Prisma.Prisma__MotoClient<import(".prisma/client").Moto>;
}

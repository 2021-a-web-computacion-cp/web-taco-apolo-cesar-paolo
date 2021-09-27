import { MotoService } from './moto.service';
export declare class MotoController {
    private motoService;
    constructor(motoService: MotoService);
    inicio(response: any): void;
    vistaCrear(response: any, qqueryParams: any): void;
    crearUsuario(response: any, bodyParams: any): Promise<void>;
    listaMotos(response: any, parametrosConsulta: any): Promise<void>;
    elminarMoto(response: any, routeParams: any): Promise<void>;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    actualizarMoto(response: any, bodyParams: any, parametrosRuta: any): Promise<any>;
    obtenerUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__MotoClient<import(".prisma/client").Moto>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").Moto>;
    actualizarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__MotoClient<import(".prisma/client").Moto>;
    borrarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__MotoClient<import(".prisma/client").Moto>;
}

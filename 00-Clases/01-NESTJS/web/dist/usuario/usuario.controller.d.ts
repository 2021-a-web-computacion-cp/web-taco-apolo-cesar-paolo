import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    listaUsuarios(response: any): void;
    obtenerUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").EPN_USUARIO>;
    actualizarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    borrarUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}

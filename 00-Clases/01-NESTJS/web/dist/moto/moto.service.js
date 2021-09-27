"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MotoService = class MotoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    buscarUno(id) {
        return this.prisma.moto.findUnique({ where: { id: id } });
    }
    buscarMuchos(parametrosBusqueda) {
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
    crearUno(moto) {
        return this.prisma.moto.create({ data: moto });
    }
    actualizarUno(parametrosActualizar) {
        return this.prisma.moto.update({
            data: parametrosActualizar.data,
            where: {
                id: +parametrosActualizar.id,
            },
        });
    }
    eliminarUno(id) {
        return this.prisma.moto.delete({
            where: { id: id },
        });
    }
};
MotoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MotoService);
exports.MotoService = MotoService;
//# sourceMappingURL=moto.service.js.map
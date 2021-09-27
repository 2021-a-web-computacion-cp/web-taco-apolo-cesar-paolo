import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MotoService } from './moto.service';
import { MotoController } from './moto.controller';

@Module({
  imports: [
    // modulos importados
  ],
  providers: [
    // declaramos servicio
    MotoService,
    PrismaService,
  ],
  exports: [
    // exportamos servicio
    MotoService,
  ],
  controllers: [
    // declaramos controladores
    MotoController,
  ],
})
export class MotoModule {}

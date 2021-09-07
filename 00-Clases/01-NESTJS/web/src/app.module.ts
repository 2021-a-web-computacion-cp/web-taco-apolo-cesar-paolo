import { Get, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//DECORADOR -> FUNCIONES
@Module({
  imports: [], // MODULOS IMPORTADOS
  controllers: [AppController], //CONTROLADORES DE ESTE MODULO
  providers: [AppService], //SERVICIOS DE ESTE MODULO
  exports: [AppService], // SERVICIOS EXPORTADOS (SE PUEDEN USAR FUERA DE ESTE MODULO)
})
export class AppModule {}

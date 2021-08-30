import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// package.json ;
// npm run start -> levantar servidor ;
// node js command prompt

// VARIABLES PRIMITIVAS
// TIPOS DE VARIABLES
// MUTABLES (reasignar -> =)
let variable1 = 1; // NO USAMOS VAR
let variable2 = 2;
variable1 = 3;
variable2 = 4;
// INNMUTABLES (no se pueden reasignar Z -> !=)
const var3 = 5;
// var3 = 2; //ERROR!

//PRIMITIVAS PRIMITIVAS (typescript)

const texto = ''; // ""
const numEntero = 1;
const numFlotante = 1.3;
const soyestudiante = true; // false
const noDefinido = undefined;
const noHayNada = null; // no se lo suele utilizar mucho
const fecha: Date = new Date();
// Duck Typing
const text2 = 'César';
let cualquierCosa: any = 'Paolo';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

class Usuario {
  constructor(public nombre: string, public apellido: string) {}
}

const usuario: Usuario = new Usuario('Cesar', 'Taco');
usuario.nombre;
usuario.apellido;

interface UuarioInterface {
  nombre: string;
  apellido: string;
  edad?: number; // ? -> opcional // valor por defecto ((undefined))
}

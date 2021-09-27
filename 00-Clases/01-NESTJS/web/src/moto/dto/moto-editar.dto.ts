import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDecimal,
  IsInt,
} from 'class-validator';

export class MotoEditarDto {
  nombre: string;

  marca: string;

  cilindraje: number;

  kilometraje: number;

  anio: number;

  precio: number;
}

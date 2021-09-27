import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDecimal,
  IsInt,
} from 'class-validator';

export class MotoCrearDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  marca: string;

  @IsNotEmpty()
  @IsDecimal()
  cilindraje: number;

  @IsNotEmpty()
  @IsInt()
  kilometraje: number;

  @IsNotEmpty()
  @IsInt()
  anio: number;

  @IsNotEmpty()
  @IsDecimal()
  precio: number;

  @IsEmpty()
  fechaCreacion: string;
}

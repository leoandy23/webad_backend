import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @Length(1, 255, {
    message: 'El nombre del proyecto debe tener entre 1 y 255 caracteres.',
  })
  name: string;

  @IsString()
  @Length(1, 1000, {
    message:
      'La descripción del proyecto debe tener entre 1 y 1000 caracteres.',
  })
  description: string;

  @IsNumber({}, { message: 'El ID del creador debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del creador no puede estar vacío.' })
  created_by: number; // ID del usuario que crea el proyecto
}

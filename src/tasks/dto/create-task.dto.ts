import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @IsNumber({}, { message: 'El ID del proyecto debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del proyecto no puede estar vacío.' })
  project_id: number; // ID del proyecto al que pertenece la tarea

  @IsString()
  @Length(1, 255, {
    message: 'El título de la tarea debe tener entre 1 y 255 caracteres.',
  })
  title: string;

  @IsString()
  @Length(1, 1000, {
    message: 'La descripción de la tarea debe tener entre 1 y 1000 caracteres.',
  })
  description: string;

  @IsString()
  @Length(1, 50, {
    message: 'El estado de la tarea debe tener entre 1 y 50 caracteres.',
  })
  @IsOptional()
  status?: string;
}

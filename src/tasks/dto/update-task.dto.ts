import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsNumber({}, { message: 'El ID del proyecto debe ser un número.' })
  @IsOptional()
  project_id?: number;

  @IsString()
  @Length(1, 255, {
    message: 'El título de la tarea debe tener entre 1 y 255 caracteres.',
  })
  @IsOptional()
  title?: string;

  @IsString()
  @Length(1, 1000, {
    message: 'La descripción de la tarea debe tener entre 1 y 1000 caracteres.',
  })
  @IsOptional()
  description?: string;

  @IsString()
  @Length(1, 50, {
    message: 'El estado de la tarea debe tener entre 1 y 50 caracteres.',
  })
  @IsOptional()
  status?: string;
}

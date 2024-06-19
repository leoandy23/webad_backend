import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @Length(1, 255, {
    message: 'El nombre del proyecto debe tener entre 1 y 255 caracteres.',
  })
  @IsOptional()
  name?: string;

  @IsString()
  @Length(1, 1000, {
    message:
      'La descripción del proyecto debe tener entre 1 y 1000 caracteres.',
  })
  @IsOptional()
  description?: string;
}

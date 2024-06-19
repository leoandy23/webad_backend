import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener un formato válido.' },
  )
  @IsOptional()
  email?: string;

  @IsString()
  @Length(6, 20, {
    message: 'La contraseña debe tener entre 6 y 20 caracteres.',
  })
  @IsOptional()
  password?: string;

  @IsString()
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres.' })
  @IsOptional()
  first_name?: string;

  @IsString()
  @Length(1, 50, { message: 'El apellido debe tener entre 1 y 50 caracteres.' })
  @IsOptional()
  last_name?: string;
}

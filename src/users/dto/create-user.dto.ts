import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener un formato válido.' },
  )
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
  email: string;

  @IsString()
  @Length(6, 20, {
    message: 'La contraseña debe tener entre 6 y 20 caracteres.',
  })
  password: string;

  @IsString()
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres.' })
  first_name: string;

  @IsString()
  @Length(1, 50, { message: 'El apellido debe tener entre 1 y 50 caracteres.' })
  last_name: string;
}

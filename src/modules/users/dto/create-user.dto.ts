import { Type } from 'class-transformer'
import {
  IsString,
  Length,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator'
import { Role } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres.' })
  dni: string

  @IsEmail({}, { message: 'El correo electrónico debe ser uno válido' })
  email: string

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @Length(8, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres.',
  })
  password: string

  @Type(() => Boolean)
  @IsBoolean({ message: 'El estado "is_active" debe ser un valor booleano.' })
  @IsOptional()
  is_active?: boolean

  @ApiProperty({ enum: Role })
  @IsEnum(Role, { message: 'El rol debe ser uno válido' })
  role: Role

  @IsOptional()
  @IsArray({ message: 'Los permisos deben ser un array de strings' })
  @IsString({ each: true, message: 'Cada permiso debe ser un string' })
  modules_access: string[]
}

import { Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'

export class CreateTopicDto {
  @IsString({
    message: 'El campo "name" debe ser una cadena de texto.',
  })
  @Length(5, 100, {
    message: 'El nombre debe tener entre 5 a 100 carácteres.',
  })
  name: string

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser una cadena de texto.',
  })
  description?: string

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({
    message: 'El campo "is_active" debe ser un valor booleano (true o false).',
  })
  is_active?: boolean

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({
    message:
      'El campo "is_archived" debe ser un valor booleano (true o false).',
  })
  is_archived?: boolean
}

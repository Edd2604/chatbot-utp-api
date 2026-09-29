import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator'

export class CreateRunDto {
  @IsUUID(7, {
    message: 'El ID de la conversación debe ser un UUID válido de versión 7.',
  })
  conversation_id: string

  @IsBoolean({
    message:
      'El campo "is_run_successful" debe ser un valor booleano (true o false).',
  })
  is_run_successful: boolean

  @IsString({
    message: 'El campo "model_llm" debe ser una cadena de texto.',
  })
  model_llm: string

  @IsNumber(
    { maxDecimalPlaces: 6 },
    {
      message: 'La latencia debe ser un número con hasta 6 decimales.',
    },
  )
  @Min(0, {
    message: 'La latencia no puede ser negativa.',
  })
  latency: number

  @IsInt({
    message: 'El campo "tokens" debe ser un número entero.',
  })
  @Min(0, {
    message: 'La cantidad de tokens no puede ser negativa.',
  })
  tokens: number

  @IsString({
    message: 'El campo "input" debe ser una cadena de texto.',
  })
  input: string

  @IsString({
    message: 'El campo "output" debe ser una cadena de texto.',
  })
  output: string

  @IsOptional()
  @IsString({
    message:
      'El campo "error", si se proporciona, debe ser una cadena de texto.',
  })
  error?: string
}

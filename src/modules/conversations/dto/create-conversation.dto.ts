import { IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class CreateConversationDto {
  @IsUUID(7, {
    message: 'El id de la conversacion debe ser un uuid version 7 ',
  })
  id: string

  @IsOptional()
  @Length(2, 100, { message: 'El titulo no debe superar los 100 carácteres' })
  @IsString()
  title?: string
}

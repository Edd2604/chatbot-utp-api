import { IsOptional, IsString, IsUUID, Length } from 'class-validator'
export class RequestChatDto {
  @IsUUID(7, {
    message: 'El id de la conversacion debe ser un uuid version 7 ',
  })
  conversation_id: string

  @Length(2, 1000, {
    message: 'El mensaje debe tener entre 2 y 1000 caracteres',
  })
  @IsString({ message: 'El mensaje debe ser un texto' })
  message: string

  @IsOptional()
  @IsUUID(7, {
    message: 'El id del tópico elegido debe ser un uuid version 7 ',
  })
  topic_id: string
}

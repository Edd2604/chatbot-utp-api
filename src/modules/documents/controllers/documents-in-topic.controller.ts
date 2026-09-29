import { UseFileInterceptor } from '@common/decorators/file-interceptor.decorator'
import { UploadFile } from '@common/decorators/upload-files.decorator'
import { ValidateUUID } from '@common/pipes/validate-uuid.pipe'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { UserSession } from '@modules/auth/decorators/user-session.decorator'
import { IUserSession } from '@modules/auth/interfaces/user-session.interface'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { LoggerEvents } from '@modules/events/logger/logger-events.interfaces'
import { Entity } from '@prisma/client'
import { Auth } from '@modules/auth/decorators/auth.decorator'

import { DocumentsService } from '../documents.service'
import { CreateDocumentDto } from '../dto/create-document.dto'

@ApiBearerAuth()
@Auth(['ADMIN', 'SUPER_ADMIN'])
@ApiTags('Topics')
@Controller('topics/:topicId/documents')
export class DocumentsInTopicController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @UseFileInterceptor()
  @Post('create-document')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
          minLength: 3,
          maxLength: 100,
        },
        description: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        is_active: {
          type: 'boolean',
        },
      },
      required: ['name', 'description', 'tags', 'file'],
    },
  })
  @ApiOperation({ summary: 'Crea un documento de cierto tópico' })
  async createDocument(
    @UserSession() session: IUserSession,
    @Param('topicId', ValidateUUID) topicId: string,
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadFile() file: Express.Multer.File,
  ) {
    createDocumentDto.topic_id = topicId
    const document = await this.documentsService.create(createDocumentDto, file)

    this.eventEmitter.emit(LoggerEvents.ENTITY_CREATED_EVENT, {
      session,
      entity: Entity.Document,
      entityId: document.id,
    })
    return document
  }

  @Get('get-documents-by-topic')
  @ApiOperation({ summary: 'Obtiene todos los documentos de cierto Tópico' })
  getAllDocumentsByTopic(@Param('topicId', ValidateUUID) topicId: string) {
    return this.documentsService.getAvailablesByTopic(topicId)
  }
}

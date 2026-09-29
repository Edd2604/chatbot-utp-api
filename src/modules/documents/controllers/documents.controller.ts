import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common'
import { ValidateUUID } from '@common/pipes/validate-uuid.pipe'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { UserSession } from '@modules/auth/decorators/user-session.decorator'
import { IUserSession } from '@modules/auth/interfaces/user-session.interface'
import { LoggerEvents } from '@modules/events/logger/logger-events.interfaces'
import { Entity } from '@prisma/client'
import { Auth } from '@modules/auth/decorators/auth.decorator'

import { DocumentsService } from '../documents.service'
import { UpdateDocumentDto } from '../dto/update-document.dto'

@ApiBearerAuth()
@Auth(['ADMIN', 'SUPER_ADMIN'])
@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get('get-all-documents')
  @ApiOperation({ summary: 'Obtiene todos los documentos subidos' })
  getAllDocuments(@Query() query: SearchStatusQueryParamsDto) {
    return this.documentsService.getAll(query)
  }

  @Get(':documentId/get-document')
  @ApiOperation({ summary: 'Obtiene un solo documento' })
  getOneDocument(@Param('documentId', ValidateUUID) documentId: string) {
    return this.documentsService.getOne(documentId)
  }

  @Patch(':documentId/update-document')
  @ApiOperation({ summary: 'Actualiza información de un documento' })
  async updateDocument(
    @UserSession() session: IUserSession,
    @Param('documentId', ValidateUUID) id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    const { actualDocument, updatedDocument } =
      await this.documentsService.update(id, updateDocumentDto)

    this.eventEmitter.emit(LoggerEvents.ENTITY_UPDATED_EVENT, {
      session,
      entity: Entity.Document,
      entityId: actualDocument.id,
      after: updatedDocument,
      before: actualDocument,
    })
    return updatedDocument
  }

  @Delete(':documentId/remove-document')
  @ApiOperation({ summary: 'Elimina un documento' })
  async removeDocument(
    @UserSession() session: IUserSession,
    @Param('documentId', ValidateUUID) documentId: string,
  ) {
    const document = await this.documentsService.remove(documentId)
    this.eventEmitter.emit(LoggerEvents.ENTITY_ARCHIVED_EVENT, {
      session,
      entity: Entity.Document,
      entityId: document.id,
    })
    return document
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from '@providers/prisma/prisma.service'
import { PrismaException } from '@providers/prisma/exceptions/prisma.exception'
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service'
import { generateUUIDV7 } from '@common/utils/uuid'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { Prisma } from '@prisma/client'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { DOCUMENT_EVENTS } from '@modules/events/document-events/document-events.interface'
import { formatDate } from '@common/utils/format-date'

import { CreateDocumentDto } from './dto/create-document.dto'
import { UpdateDocumentDto } from './dto/update-document.dto'

@Injectable()
export class DocumentsService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly db: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    const url = await this.cloudinary.uploadFileToCloudinary(file)
    try {
      const newDocument = await this.db.document.create({
        data: {
          id: generateUUIDV7(),
          ...createDocumentDto,
          size: file.size,
          url,
        },
      })

      if (newDocument) {
        this.eventEmitter.emit(DOCUMENT_EVENTS.ON_DOCUMENT_CREATED, newDocument)
        return newDocument
      }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al crear el documento',
      )
    }
  }

  async getAll({ page, page_size, status, query }: SearchStatusQueryParamsDto) {
    const pages = page || 1
    const skip = (pages - 1) * page_size

    const where = {
      AND: [
        query
          ? { name: { contains: query, mode: Prisma.QueryMode.insensitive } }
          : {},
        status !== null && status !== undefined ? { is_active: status } : {},
      ],
      is_archived: false,
    }

    const [docs, total] = await Promise.all([
      this.db.document.findMany({
        where,
        take: page_size,
        skip,
      }),
      this.db.document.count({ where }),
    ])

    const totalPages = Math.ceil(total / page_size)

    const data = docs.map((d, i) => {
      return {
        ...d,
        number: i + 1,
        created_at: formatDate(d.created_at),
        updated_at: formatDate(d.updated_at),
      }
    })
    return {
      data,
      total,
      totalPages,
    }
  }

  async getAvailablesByTopic(topicId: string) {
    return await this.db.document.findMany({
      where: {
        topic_id: topicId,
        is_archived: false,
        is_active: true,
      },
      select: {
        name: true,
        url: true,
      },
    })
  }

  async getOne(id: string) {
    return await this.db.document.findFirst({
      where: {
        id,
        is_archived: false,
      },
    })
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    try {
      const actualDocument = await this.getOne(id)
      const updatedDocument = await this.db.document.update({
        where: {
          id,
          is_archived: false,
        },
        data: {
          ...updateDocumentDto,
        },
        omit: { is_archived: true },
      })
      if (updatedDocument) {
        return { actualDocument, updatedDocument }
      }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el documento',
      )
    }
  }

  async remove(id: string) {
    try {
      const archivedDocument = await this.db.document.update({
        where: {
          id,
          is_archived: false,
        },
        data: {
          is_active: false,
          is_archived: true,
        },
      })
      if (archivedDocument) {
        this.eventEmitter.emit(
          DOCUMENT_EVENTS.ON_DOCUMENT_REMOVED,
          archivedDocument,
        )
        return archivedDocument
      }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al archivar el documento',
      )
    }
  }
}

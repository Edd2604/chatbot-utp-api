/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from '@providers/prisma/prisma.service'
import { PrismaException } from '@providers/prisma/exceptions/prisma.exception'
import { generateUUIDV7 } from '@common/utils/uuid'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { Prisma } from '@prisma/client'
import { formatDate } from '@common/utils/format-date'

import { UpdateTopicDto } from './dto/update-topic.dto'
import { CreateTopicDto } from './dto/create-topic.dto'

@Injectable()
export class TopicsService {
  constructor(private readonly db: PrismaService) {}
  async create(createTopicDto: CreateTopicDto) {
    try {
      const newTopic = await this.db.topic.create({
        data: {
          id: generateUUIDV7(),
          ...createTopicDto,
        },
      })
      if (newTopic) {
        return newTopic
      }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al crear el nuevo Topico',
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

    const [topics, total] = await Promise.all([
      this.db.topic.findMany({
        where,
        take: page_size,
        skip,
      }),
      this.db.topic.count({ where }),
    ])

    const totalPages = Math.ceil(total / page_size)
    const data = topics.map((t, i) => {
      return {
        ...t,
        number: i + 1,
        created_at: formatDate(t.created_at),
        updated_at: formatDate(t.updated_at),
      }
    })
    return {
      data,
      total,
      totalPages,
    }
  }

  async getAvailables() {
    return await this.db.topic.findMany({
      where: {
        is_active: true,
        is_archived: false,
        documents: {
          some: {
            is_active: true,
            is_archived: false,
          },
        },
      },
      omit: {
        is_active: true,
        is_archived: true,
        updated_at: true,
        documents_count: true,
        total_size: true,
      },
    })
  }

  async getOne(id: string) {
    return await this.db.topic.findFirst({
      where: {
        id,
        is_archived: false,
      },
      omit: {
        is_archived: true,
      },
    })
  }

  async getOneWithDocuments(id: string) {
    return await this.db.topic.findFirst({
      where: {
        id,
        is_archived: false,
      },
      include: {
        documents: true,
      },
    })
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    try {
      const actualTopic = await this.getOne(id)
      const updatedTopic = await this.db.topic.update({
        where: {
          id,
          is_archived: false,
        },
        data: {
          ...updateTopicDto,
        },
        omit: {
          is_archived: true,
        },
      })
      if (updatedTopic) {
        return { actualTopic, updatedTopic }
      }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el topico',
      )
    }
  }

  async updateSizeAndCount(id: string, size: number) {
    try {
      const data: any = {}

      if (size < 0) {
        data.total_size = {
          decrement: Math.abs(size),
        }
        data.documents_count = {
          decrement: 1,
        }
      } else {
        data.total_size = {
          increment: size,
        }
        data.documents_count = {
          increment: 1,
        }
      }

      const updatedTopic = await this.db.topic.update({
        where: {
          id,
          is_archived: false,
        },
        data,
      })

      return updatedTopic
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el tópico',
      )
    }
  }

  async remove(id: string) {
    try {
      const archivedTopic = await this.db.topic.update({
        where: {
          id,
          is_archived: false,
        },
        data: {
          is_active: false,
          is_archived: true,
        },
      })
      if (archivedTopic) {
        return archivedTopic
      }
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al archivar el topico',
      )
    }
  }
}

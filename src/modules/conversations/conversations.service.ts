import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { PrismaService } from 'src/providers/prisma/prisma.service'
import { PrismaException } from 'src/providers/prisma/exceptions/prisma.exception'
import { formatDate } from '@common/utils/format-date'
import { GeminiAIService } from '@providers/gemini-ai/gemini-ai.service'
import { ConversationStatus } from '@prisma/client'

import { CreateConversationDto } from './dto/create-conversation.dto'
import { ConversationsQueryParams } from './query-params/conversations-query-params'
@Injectable()
export class ConversationsService {
  constructor(
    private readonly db: PrismaService,
    private readonly ai: GeminiAIService,
  ) {}
  async create(createConversationDto: CreateConversationDto) {
    try {
      const newConversation = await this.db.conversation.create({
        data: {
          ...createConversationDto,
        },
      })
      if (newConversation) return newConversation
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'Hubo un error al crear la conversación',
      )
    }
  }

  async getAll({
    page,
    page_size,
    start_date,
    end_date,
    conversationStatus,
  }: ConversationsQueryParams) {
    const pages = page || 1
    const skip = (pages - 1) * page_size

    const where = {
      created_at: {
        ...(start_date ? { gte: start_date } : {}),
        ...(end_date ? { lte: end_date } : {}),
      },
      status: conversationStatus,
    }

    const [conversations, total] = await Promise.all([
      this.db.conversation.findMany({
        where,
        take: page_size,
        skip,
      }),
      this.db.conversation.count({ where }),
    ])

    const totalPages = Math.ceil(total / page_size)
    const data = conversations.map((c, i) => {
      return {
        ...c,
        number: i + 1,
        created_at: formatDate(c.created_at),
        last_run: formatDate(c.last_run),
        completed_at: formatDate(c.completed_at),
      }
    })
    return {
      data,
      total,
      totalPages,
    }
  }

  async getOneWithRuns(id: string) {
    return await this.db.conversation.findFirst({
      where: {
        id,
      },
      include: {
        runs: true,
      },
    })
  }

  async getOne(conversationId: string) {
    return await this.db.conversation.findFirst({
      where: {
        id: conversationId,
      },
    })
  }

  async update(conversationId: string, tokens: number) {
    try {
      const conversationUpdated = await this.db.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          total_runs: {
            increment: 1,
          },
          total_tokens: {
            increment: tokens,
          },
          last_run: new Date(),
        },
      })
      return conversationUpdated
    } catch (e) {
      if (e.code) throw new PrismaException(e)

      throw new InternalServerErrorException(
        'Hubo un error al actualizar los tokens',
      )
    }
  }

  async close(conversationId: string) {
    try {
      const conversationUpdated = await this.db.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          status: ConversationStatus.CLOSED,
          completed_at: new Date(),
        },
      })
      return conversationUpdated
    } catch (e) {
      if (e.code) throw new PrismaException(e)

      throw new InternalServerErrorException(
        'Hubo un error al cerrar la conversación',
      )
    }
  }

  async validateActive(conversationId: string) {
    const conv = await this.db.conversation.findFirst({
      where: {
        id: conversationId,
        status: ConversationStatus.ACTIVE,
      },
    })
    if (!conv)
      throw new ConflictException(
        'Intento de ejecutar una conversacion cerrada',
      )
  }
}

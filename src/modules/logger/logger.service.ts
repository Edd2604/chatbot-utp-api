/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@providers/prisma/prisma.service'
import { IUserSession } from '@auth/interfaces/user-session.interface'
import { Action, Entity } from '@prisma/client'
import { formatDate } from '@common/utils/format-date'

import { LogsQueryParams } from './query-params/logs-query-params'

@Injectable()
export class LoggerService {
  constructor(private readonly db: PrismaService) {}

  async getAll({ page, page_size, logAction }: LogsQueryParams) {
    const pages = page || 1
    const skip = (pages - 1) * page_size

    const [logs, total] = await Promise.all([
      this.db.log.findMany({
        where: {
          action: logAction,
        },
        skip,
        take: page_size,
        orderBy: {
          id: 'desc',
        },
      }),
      this.db.log.count({
        where: {
          action: logAction,
        },
      }),
    ])

    const totalPages = Math.ceil(total / page_size)
    const data = logs.map((l) => {
      return {
        ...l,
        created_at: formatDate(l.created_at),
      }
    })
    return {
      data,
      total,
      totalPages,
    }
  }

  async createEntityLog(user: IUserSession, entity: Entity, entity_id: string) {
    try {
      const log = await this.db.log.create({
        data: {
          user_id: user.id,
          entity: entity,
          action: Action.CREATE,
          entity_id: entity_id,
        },
      })
      console.log(log)
    } catch (e) {
      console.warn(e)
    }
  }

  async updateEntityLog(
    user: IUserSession,
    entity: Entity,
    entity_id: string,
    after?: any,
    before?: any,
  ) {
    try {
      const log = await this.db.log.create({
        data: {
          user_id: user.id,
          entity: entity,
          action: Action.UPDATE,
          entity_id: entity_id,
          details: {
            after,
            before,
          },
        },
      })
      console.log(log)
    } catch (e) {
      console.warn(e)
    }
  }

  async deleteEntityLog(user: IUserSession, entity: Entity, entity_id: string) {
    try {
      const log = await this.db.log.create({
        data: {
          user_id: user.id,
          entity: entity,
          action: Action.DELETE,
          entity_id: entity_id,
        },
      })
      console.log(log)
    } catch (e) {
      console.warn(e)
    }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { GeminiAIService } from '@providers/gemini-ai/gemini-ai.service'
import { GeminiModels } from '@providers/gemini-ai/interfaces/gemini-ai-models.enum'
import { PrismaService } from '@providers/prisma/prisma.service'
import { subMonths, startOfMonth, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { SchemaType } from '@google/generative-ai'

import { TOP_INPUTS_CONTEXT } from './prompts/top-inputs.context'

@Injectable()
export class MonitoringService {
  constructor(
    private readonly db: PrismaService,
    private readonly ai: GeminiAIService,
  ) {}

  async getRunsAnalytics() {
    const start = new Date(new Date().getFullYear(), 0, 1)
    const end = new Date()

    const runs = await this.db.run.findMany({
      where: {
        created_at: {
          gte: start,
          lte: end,
        },
      },
      select: {
        created_at: true,
        is_run_successful: true,
      },
    })

    const summary = new Map<string, { ok: number; error: number }>()
    for (const run of runs) {
      const date = run.created_at.toISOString().split('T')[0]
      if (!summary.has(date)) {
        summary.set(date, { ok: 0, error: 0 })
      }
      const entry = summary.get(date)!
      if (run.is_run_successful) {
        entry.ok++
      } else {
        entry.error++
      }
    }

    const result: { date: string; ok: number; error: number }[] = []
    const current = new Date(start)

    while (current <= end) {
      const date = current.toISOString().split('T')[0]
      const counts = summary.get(date) ?? { ok: 0, error: 0 }
      result.push({ date, ...counts })

      current.setDate(current.getDate() + 1)
    }

    return result
  }

  async getTokensPerMonth() {
    const now = new Date()
    const sixMonthsAgo = subMonths(now, 5)

    const runs = await this.db.run.findMany({
      where: {
        created_at: {
          gte: startOfMonth(sixMonthsAgo),
        },
      },
      select: {
        created_at: true,
        tokens: true,
      },
    })

    const months: Record<string, number> = {}

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(now, i)
      const monthKey = format(date, 'MMMM', { locale: es })
      months[monthKey.charAt(0).toUpperCase() + monthKey.slice(1)] = 0
    }

    runs.forEach((run) => {
      const monthKey = format(run.created_at, 'MMMM', { locale: es })
      const monthSummary = monthKey.charAt(0).toUpperCase() + monthKey.slice(1)
      if (months[monthSummary] !== undefined) {
        months[monthSummary] += run.tokens ?? 0
      }
    })

    return Object.entries(months).map(([month, totalTokens]) => ({
      month,
      totalTokens,
    }))
  }

  async getTopInputs() {
    const runs = await this.db.run.findMany({
      select: { created_at: true, input: true, conversation_id: true },
      orderBy: { created_at: 'desc' },
      take: 2000,
    })

    const validInputs = runs.filter(
      (run) => run.input && run.input.trim().length > 0,
    )

    const aiResponse = await this.ai.getStructuredResponse(
      GeminiModels.GEMINI_1_5_FLASH_8B,
      TOP_INPUTS_CONTEXT,
      [JSON.stringify(validInputs)],
      {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            number: { type: SchemaType.INTEGER },
            question: { type: SchemaType.STRING },
          },
          required: ['number', 'question'],
        },
      },
    )
    try {
      return JSON.parse(aiResponse)
    } catch (e) {
      console.warn(e)
      throw new InternalServerErrorException('Error en la generacion de la ia')
    }
  }
}

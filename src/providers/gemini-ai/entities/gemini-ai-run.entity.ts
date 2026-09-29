import { CreateRunDto } from '@modules/runs/dto/create-run.dto'

import { IGeminiRunData } from '../interfaces/gemini-ai-entity.interface'

export class GeminiRunData implements IGeminiRunData {
  input = ''
  output = ''
  tokens = 0
  model = ''
  latency = 0
  error: string | null = null

  private startTime: number

  constructor() {
    this.startTime = Date.now()
  }

  setInput(input: string) {
    this.input = input
  }

  setModel(model: string) {
    this.model = model
  }

  addChunk(text: string) {
    this.output += text
  }

  setTokens(count: number) {
    this.tokens = count
  }

  setError(message: string) {
    this.error = message
  }

  finish() {
    this.latency = Number(((Date.now() - this.startTime) / 1000).toFixed(6))
    return this
  }

  toCreateDto(conversationId: string): CreateRunDto {
    return {
      conversation_id: conversationId,
      is_run_successful: this.error === null,
      model_llm: this.model,
      latency: this.latency,
      tokens: this.tokens,
      input: this.input,
      output: this.output,
      error: this.error ?? undefined,
    }
  }
}

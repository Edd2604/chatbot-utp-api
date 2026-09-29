/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, Injectable } from '@nestjs/common'
import {
  GenerateContentRequest,
  GoogleGenerativeAI,
  Part,
} from '@google/generative-ai'
import { Observable } from 'rxjs'
import { Schema } from '@google/generative-ai'

import { GeminiRunData } from './entities/gemini-ai-run.entity'
import { GeminiModels } from './interfaces/gemini-ai-models.enum'
import { IGeminiRunError } from './interfaces/gemini-ai-error.interface'
import { IGeminiMessageChat } from './interfaces/gemini-ai-historial.interface'

@Injectable()
export class GeminiAIService {
  constructor(private readonly genAI: GoogleGenerativeAI) {}

  private generateModel(geminiModel: GeminiModels, context: string) {
    return this.genAI.getGenerativeModel({
      model: geminiModel,
      systemInstruction: context,
      generationConfig: { temperature: 1 },
    })
  }
  private generateStructuredModel(
    geminiModel: GeminiModels,
    context: string,
    schema: Schema,
  ) {
    return this.genAI.getGenerativeModel({
      model: geminiModel,
      systemInstruction: context,
      generationConfig: {
        temperature: 1,
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    })
  }

  private handleStreamError(
    observer: any,
    run: GeminiRunData,
    message: string,
    statusCode: number,
  ): void {
    run.setError(message)
    observer.error(
      JSON.stringify({
        error: {
          ok: false,
          message,
          statusCode,
        },
        metadata: run.finish(),
      } as IGeminiRunError),
    )
  }

  stream(
    query: string,
    geminiModel: GeminiModels,
    contextInstructions: string,
  ): Observable<string> {
    const model = this.generateModel(geminiModel, contextInstructions)

    return new Observable<string>((observer) => {
      const run = new GeminiRunData()
      run.setInput(query)
      run.setModel(model.model)

      model
        .generateContentStream([query])
        .then(async (result) => {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text()
              run.addChunk(text)
              observer.next(text)
            }

            const response = await result.response
            run.setTokens(response.usageMetadata.totalTokenCount)

            observer.next(JSON.stringify(run.finish()))
            observer.complete()
          } catch (e) {
            this.handleStreamError(
              observer,
              run,
              `Error en el flujo del stream: ${e.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            )
          }
        })
        .catch((e) => {
          this.handleStreamError(
            observer,
            run,
            `Error en la llamada al modelo de Google: ${e.statusText || e.message}`,
            HttpStatus.SERVICE_UNAVAILABLE,
          )
        })
    })
  }

  streamChatMessage(
    history: IGeminiMessageChat[],
    message: string,
    geminiModel: GeminiModels,
    contextInstructions: string,
  ): Observable<string> {
    const model = this.generateModel(geminiModel, contextInstructions)

    const chat = model.startChat({ history })

    return new Observable<string>((observer) => {
      const run = new GeminiRunData()
      run.setInput(message)
      run.setModel(model.model)

      chat
        .sendMessageStream(message)
        .then(async (result) => {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text()
              run.addChunk(text)
              observer.next(text)
            }

            const response = await result.response
            run.setTokens(response.usageMetadata.totalTokenCount)

            observer.next(JSON.stringify(run.finish()))
            observer.complete()
          } catch (e) {
            this.handleStreamError(
              observer,
              run,
              `Error en el flujo del stream: ${e.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            )
          }
        })
        .catch((e) => {
          this.handleStreamError(
            observer,
            run,
            `Error en la llamada al modelo de Google: ${e.statusText || e.message}`,
            HttpStatus.SERVICE_UNAVAILABLE,
          )
        })
    })
  }

  async getResponse(
    GeminiModel: GeminiModels,
    context: string,
    query: GenerateContentRequest | string | Array<string | Part>,
  ) {
    const model = this.generateModel(GeminiModel, context)

    const { response } = await model.generateContent(query)
    return response.text()
  }

  async getStructuredResponse(
    GeminiModel: GeminiModels,
    context: string,
    query: GenerateContentRequest | string | Array<string | Part>,
    schema: Schema,
  ) {
    const model = this.generateStructuredModel(GeminiModel, context, schema)

    const { response } = await model.generateContent(query)
    return response.text()
  }
}

import { Prisma } from '@prisma/client'

export interface DocumentEventPayload {
  id: string
  name: string
  is_active: boolean
  url: string
  description: string
  tags: string[]
  topic_id: string
  size: Prisma.Decimal
}
export enum DOCUMENT_EVENTS {
  ON_DOCUMENT_CREATED = 'documents.created',
  ON_DOCUMENT_REMOVED = 'documents.removed',
}

export interface RunExecutedEvent {
  conversation_id: string
  is_run_successful: boolean
  model_llm: string
  latency: number
  tokens: number
  input: string
  output: string
  error?: string
}
export enum RUN_EVENTS {
  ON_RUN_EXECUTED_EVENT = 'run.excuted',
}

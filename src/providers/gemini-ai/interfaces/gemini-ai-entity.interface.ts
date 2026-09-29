export interface IGeminiRunData {
  input: string
  output: string
  tokens: number
  model: string
  latency: number
  error: string | null
}

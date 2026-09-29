export declare class CreateRunDto {
    conversation_id: string;
    is_run_successful: boolean;
    model_llm: string;
    latency: number;
    tokens: number;
    input: string;
    output: string;
    error?: string;
}

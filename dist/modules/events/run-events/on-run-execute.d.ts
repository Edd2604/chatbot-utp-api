import { ConversationsService } from '@modules/conversations/conversations.service';
import { RunsService } from '@modules/runs/runs.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GeminiAIService } from '@providers/gemini-ai/gemini-ai.service';
import { RunExecutedEvent } from './run-events.interfaces';
export declare class OnRunExecuteHandler {
    private readonly events;
    private readonly runsService;
    private readonly conversationsService;
    private readonly ai;
    constructor(events: EventEmitter2, runsService: RunsService, conversationsService: ConversationsService, ai: GeminiAIService);
    handleCreated(payload: RunExecutedEvent): Promise<string | null>;
    private generateTitle;
}

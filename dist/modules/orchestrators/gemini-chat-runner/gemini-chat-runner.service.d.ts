import { GeminiAIService } from '@providers/gemini-ai/gemini-ai.service';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RunsService } from '@modules/runs/runs.service';
import { DocumentsService } from '@modules/documents/documents.service';
import { PusherService } from '@providers/pusher/pusher.service';
import { ConversationsService } from '@modules/conversations/conversations.service';
export declare class GeminiChatRunnerService {
    private readonly ai;
    private readonly eventEmitter;
    private readonly runService;
    private readonly documentService;
    private readonly pusherService;
    private readonly conversationService;
    constructor(ai: GeminiAIService, eventEmitter: EventEmitter2, runService: RunsService, documentService: DocumentsService, pusherService: PusherService, conversationService: ConversationsService);
    streamChatResponse(conversation_id: string, message: string, topic_id?: string): Observable<any>;
    private handleRunExecutedEvent;
    private mapRunsToHistory;
    private extractDocumentsContext;
    reportError(error: string): Promise<void>;
}

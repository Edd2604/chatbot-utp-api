import { Observable } from 'rxjs';
import { GeminiChatRunnerService } from '@modules/orchestrators/gemini-chat-runner/gemini-chat-runner.service';
import { RunsService } from '@modules/runs/runs.service';
import { Message } from './interfaces/chat.interfaces';
import { RequestChatDto } from './dto/request-chat.dto';
export declare class ChatService {
    private readonly geminiRunner;
    private readonly runsService;
    constructor(geminiRunner: GeminiChatRunnerService, runsService: RunsService);
    doStream(requestChat: RequestChatDto): Observable<unknown>;
    getChathistory(converationId: string): Promise<Message[]>;
}

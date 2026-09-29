import { Response, Request } from 'express';
import { ChatService } from './chat.service';
import { RequestChatDto } from './dto/request-chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    send(res: Response, req: Request, body: RequestChatDto): void;
    getHistory(conversationId: string): Promise<import("./interfaces/chat.interfaces").Message[]>;
}

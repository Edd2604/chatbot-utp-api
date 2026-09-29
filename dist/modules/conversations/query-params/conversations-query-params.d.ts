import { RangeDateQueryParams } from '@common/query-params/rangeDate-query-params';
import { ConversationStatus } from '@prisma/client';
export declare class ConversationsQueryParams extends RangeDateQueryParams {
    conversationStatus: ConversationStatus;
}

import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AnalyticsQueryParams } from './params/analytics-query-params';
import { UploadWebsitesDto } from './dto/upload-websites.dto';
import { RequestStackAI } from './interfaces/query-stack-ai.interface';
export declare class StackAIService {
    private readonly httpService;
    constructor(httpService: HttpService);
    streamQuery(data: RequestStackAI): Observable<any>;
    query(data: RequestStackAI): Promise<any>;
    getDocuments(): Promise<any>;
    uploadDocuments(files: Express.Multer.File[]): Promise<any>;
    uploadDocument(file: Express.Multer.File): Promise<any>;
    getWebsites(): Promise<any>;
    uploadWebsites(data: UploadWebsitesDto): Promise<any>;
    getAnalytics(query: AnalyticsQueryParams): Promise<any>;
}

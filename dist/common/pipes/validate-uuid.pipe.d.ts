import { PipeTransform } from '@nestjs/common';
export declare class ValidateUUID implements PipeTransform {
    transform(value: string): string;
}

import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class ConfigService {
    private readonly configService;
    constructor(configService: NestConfigService);
    private getValue;
    getString(name: string): string;
    getNumber(name: string): number;
    getBoolean(name: string): boolean;
    getDate(name: string): Date;
}

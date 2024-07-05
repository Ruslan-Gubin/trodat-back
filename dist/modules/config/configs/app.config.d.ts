import { ConfigService } from '../config.service';
export declare class AppConfig {
    readonly name: string;
    readonly port: number;
    readonly isProduction: boolean;
    readonly parse_url: string;
    constructor(configService: ConfigService);
    get now(): Date;
}

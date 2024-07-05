import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { ConfigService } from '../config.service';
export declare class MongoConfig implements MongooseOptionsFactory {
    private readonly host;
    private readonly port;
    private readonly username;
    private readonly password;
    private readonly database;
    constructor(configService: ConfigService);
    createMongooseOptions(): MongooseModuleOptions;
}

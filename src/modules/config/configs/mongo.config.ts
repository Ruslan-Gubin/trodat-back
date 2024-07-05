import { Injectable } from '@nestjs/common';
import {MongooseModuleOptions, MongooseOptionsFactory} from "@nestjs/mongoose";
import { ConfigService } from '../config.service';

@Injectable()
export class MongoConfig implements MongooseOptionsFactory {
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;
  private readonly database: string;

  constructor(configService: ConfigService) {
    this.host = configService.getString('MYSQL_HOST');
    this.port = configService.getNumber('MYSQL_PORT');
    this.username = configService.getString('MYSQL_USER');
    this.password = configService.getString('MYSQL_PASSWORD');
    this.database = configService.getString('MYSQL_NAME');
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://localhost/trodat',
      dbName: this.database
    };
  }
}
//mongodb+srv://Ruslan:gjcnfk156@cluster0.odh79.mongodb.net/monopoly?retryWrites=true&w=majority
//mongodb+srv://username:password@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

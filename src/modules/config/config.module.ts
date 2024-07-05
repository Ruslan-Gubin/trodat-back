import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from './config.service';
import {
  AppConfig,
  MinioConfig,
  SuperAdminConfig,
  MongoConfig
} from './configs';
import { path } from 'app-root-path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot(),
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    ConfigService,
    AppConfig,
    SuperAdminConfig,
    MinioConfig,
    MongoConfig
  ],
  exports: [
    AppConfig,
    SuperAdminConfig,
    ConfigService,
    MinioConfig,
    MongoConfig
  ],
})
export class ConfigModule {}

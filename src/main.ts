import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppConfig } from './modules/config/configs';
import cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.use(cors({
    credentials: true,
    origin: '*'
  }))
  const appConfig = app.get(AppConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api')

  await app.listen(appConfig.port, () =>
    console.log('Server was started on port: ' + appConfig.port),
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  process.env.TZ = 'America/La_Paz';
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(__dirname, '..', '..', 'uploads')));
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();

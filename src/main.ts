import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ["content-type"],
    origin: [
      'http://localhost:3000',
      'https://home-crescent.vercel.app',
      'https://homecrescent-developer.vercel.app'
    ],
    credentials: true,
    preflightContinue: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8082);
}
bootstrap();

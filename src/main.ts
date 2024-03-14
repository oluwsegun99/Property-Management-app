import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: [
      'http://localhost:3000',
    ],
    credentials: true,
    preflightContinue: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH'],
    optionsSuccessStatus: 200
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8082);
}
bootstrap();

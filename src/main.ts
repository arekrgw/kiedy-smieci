import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(ConfigService);
  //rate limitter
  const options = new DocumentBuilder()
    .setTitle('KiedyŚmieciAPI')
    .setDescription('KiedyŚmieci API documentation')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60,
      max: configuration.get('RATE_LIMIT'),
    }),
  );
  await app.listen(3000);
}
bootstrap();

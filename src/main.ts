import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  // ✅ ACTIVER CORS
  app.enableCors({
    origin: '*', // pour le dev
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

=======
>>>>>>> 348563159f5d86b6c6bc04e4c1bb4a6449402a19
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Nest Auth API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

<<<<<<< HEAD
=======
  

>>>>>>> 348563159f5d86b6c6bc04e4c1bb4a6449402a19
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

<<<<<<< HEAD
  await app.listen(process.env.PORT ?? 3000);
=======
 await app.listen(process.env.PORT ?? 3000);
>>>>>>> 348563159f5d86b6c6bc04e4c1bb4a6449402a19
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // ✅ ACTIVER CORS
  app.enableCors({
    origin: '*', // pour le dev
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });


  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Nest Auth API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
  


}

bootstrap();

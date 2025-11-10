import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Ativa validações globais
  app.useGlobalPipes(new ValidationPipe({ whitelist: false, transform: true }));

  // ✅ Ativa CORS (Cross-Origin Resource Sharing)
  app.enableCors({
    origin: [
      'http://localhost:3000', // frontend React/Next
      'http://localhost:3001', // Figma ou outro endpoint local
      'https://ccem.riseconsulting.co.mz',
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // permite envio de tokens/autenticação
  });

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('SB Events API (Clean Architecture)')
    .setDescription('API de Gestão de Eventos - Standard Bank')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  // ✅ Porta padrão 3000, pode alterar para 3001 se quiser
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port);

  console.log(`🚀 API rodando em http://localhost:${port} (Swagger em /api)`);
}
bootstrap();

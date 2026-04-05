"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: false, transform: true }));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://ccem.riseconsulting.co.mz',
            'https://www.figma.com',
            'https://preview.figma.com',
        ],
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SB Events API (Clean Architecture)')
        .setDescription('API de Gestão de Eventos - Standard Bank')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
        .build();
    const doc = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, doc);
    const port = process.env.PORT ? Number(process.env.PORT) : 3001;
    await app.listen(port);
    console.log(`🚀 API rodando em http://localhost:${port} (Swagger em /api)`);
}
bootstrap();
//# sourceMappingURL=main.js.map
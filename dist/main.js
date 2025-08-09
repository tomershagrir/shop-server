"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const createApiDocument = () => new swagger_1.DocumentBuilder()
    .setTitle('Nest JS Service API')
    .setVersion('1.0')
    .build();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = createApiDocument();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const fs = await Promise.resolve().then(() => require('fs'));
    fs.writeFileSync('apidoc-spec.json', JSON.stringify(document));
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map
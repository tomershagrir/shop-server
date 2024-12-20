// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';

const createApiDocument = (): Omit<OpenAPIObject, 'paths'> =>
    new DocumentBuilder()
        .setTitle('Nest JS Service API')
        .setVersion('1.0')
        .build();


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    const config: Omit<OpenAPIObject, 'paths'> = createApiDocument();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    const fs = await import('fs');
    fs.writeFileSync('apidoc-spec.json', JSON.stringify(document));
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3001);
}
bootstrap();


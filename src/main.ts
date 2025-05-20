import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        session({
            secret: 'JDVADKVBSDAOWEIFJDSVBDSFHBVDJF',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000,
                secure: true,
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('The users API description')
        .addTag('auth', 'Authentication related endpoints')
        .addTag('users', 'User management endpoints')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter your JWT token',
            },
            'token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const sessionSecret = configService.get<string>('SESSION_SECRET');
    console.log('sessionSecret', sessionSecret);

    app.use(
        session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000,
                secure: false,
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    // Cấu hình views
    const viewsPath = join(__dirname, '..', 'src', 'views');
    app.setViewEngine('pug');
    app.setBaseViewsDir(viewsPath);

    // Cấu hình Swagger
    const config = new DocumentBuilder()
        .setTitle('Training System API')
        .setDescription('API documentation for Training System')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Cấu hình CORS
    app.enableCors();

    // Middleware để log request
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log('Views directory:', viewsPath);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@modules/databases/databases.module';
import { UserModule } from '@modules/users/user.module';
// import { AuthModule } from '@modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bullmq';
import { HttpErrorFilter } from './interceptors/httpError.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { CourseModule } from '@modules/courses/course.module';
import { TaskModule } from '@modules/tasks/task.module';
import { SubjectModule } from '@modules/subjects/subjects.module';
import { UserCourseModule } from '@modules/user_course/user_course.module';
import { UserSubjectModule } from '@modules/user_subject/user_subject.module';
import { UserTaskModule } from '@modules/user_task/user_task.module';
import { SupervisorCourseModule } from '@modules/supervisor_course/supervisor_course.module';
import { CourseSubjectModule } from '@modules/course_subject/course_subject.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          service: 'gmail',
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
          logger: true,
        },
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: 'src/i18n/',
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    DatabaseModule,
    UserModule,
    CourseModule,
    TaskModule,
    SubjectModule,
    CourseSubjectModule,
    UserCourseModule,
    UserSubjectModule,
    UserTaskModule,
    SupervisorCourseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}

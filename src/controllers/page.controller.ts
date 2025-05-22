import { Controller, Get, Query, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { NoGlobalInterceptor } from '../decorators/no-global-interceptor.decorator';
import { Reflector } from '@nestjs/core';

@Controller('views')
export class PageController {
    constructor(private reflector: Reflector) {}

    @Get('home')
    @NoGlobalInterceptor()
    getHomePage(@Res() res: Response) {
        return res.render('trainee/home');
    }

    @Get('auth')
    @NoGlobalInterceptor()
    getAuthPage(@Query('mode') mode: string, @Res() res: Response) {
        const isLogin = mode !== 'register';
        return res.render('trainee/auth', { isLogin });
    }

    @Get('courses/:id')
    @NoGlobalInterceptor()
    getCourseDetailPage(@Param('id') id: string, @Res() res: Response) {
        return res.render('trainee/course-detail');
    }

    @Get('my-courses')
    @NoGlobalInterceptor()
    getMyCoursesPage(@Res() res: Response) {
        return res.render('trainee/my-courses');
    }
}

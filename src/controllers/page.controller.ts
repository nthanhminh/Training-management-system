import { Controller, Get, Query, Param, Res, Render } from '@nestjs/common';
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

    @Get('supervisor/auth')
    @NoGlobalInterceptor()
    getSupervisorAuthPage(@Query('mode') mode: string, @Res() res: Response) {
        const isLogin = mode !== 'register';
        return res.render('supervisor/auth', { isLogin });
    }

    @Get('supervisor')
    @Render('supervisor/home')
    @NoGlobalInterceptor()
    async getSupervisorHome() {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR',
        };
        const stats = {
            courseCount: 5,
            subjectCount: 15,
            taskCount: 30,
        };

        const recentCourses = [
            {
                id: '1',
                name: 'Khóa học Node.js',
                studentCount: 25,
                status: 'active',
            },
            {
                id: '2',
                name: 'Khóa học React',
                studentCount: 30,
                status: 'active',
            },
        ];

        return { user, stats, recentCourses };
    }

    @Get('supervisor/courses')
    @Render('supervisor/courses')
    @NoGlobalInterceptor()
    async getSupervisorCourses() {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR',
        };
        const courses = [
            {
                id: '1',
                name: 'Khóa học Node.js',
                description: 'Học Node.js từ cơ bản đến nâng cao',
                studentCount: 25,
                createdAt: '2024-03-15',
                status: 'active',
            },
            {
                id: '2',
                name: 'Khóa học React',
                description: 'Học React và Redux',
                studentCount: 30,
                createdAt: '2024-03-10',
                status: 'active',
            },
        ];

        return { user, courses, currentPage: 1, totalPages: 1 };
    }

    @Get('supervisor/subjects')
    @Render('supervisor/subjects')
    @NoGlobalInterceptor()
    async getSupervisorSubjects() {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR',
        };
        const subjects = [
            {
                id: '1',
                name: 'Node.js Cơ bản',
                courseName: 'Khóa học Node.js',
                taskCount: 10,
                createdAt: '2024-03-15',
            },
            {
                id: '2',
                name: 'React Hooks',
                courseName: 'Khóa học React',
                taskCount: 8,
                createdAt: '2024-03-10',
            },
        ];

        const courses = [
            {
                id: '1',
                name: 'Khóa học Node.js',
            },
            {
                id: '2',
                name: 'Khóa học React',
            },
        ];

        return { user, subjects, courses, currentPage: 1, totalPages: 1 };
    }

    @Get('supervisor/tasks')
    @Render('supervisor/tasks')
    @NoGlobalInterceptor()
    async getSupervisorTasks() {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR',
        };
        const tasks = [
            {
                id: '1',
                title: 'Bài tập Node.js - Express',
                contentLink: 'https://example.com/task1',
                subjectName: 'Node.js Cơ bản',
                createdAt: '2024-03-15',
            },
            {
                id: '2',
                title: 'Bài tập React - Components',
                contentLink: 'https://example.com/task2',
                subjectName: 'React Hooks',
                createdAt: '2024-03-10',
            },
        ];

        const subjects = [
            {
                id: '1',
                name: 'Node.js Cơ bản',
            },
            {
                id: '2',
                name: 'React Hooks',
            },
        ];

        return { user, tasks, subjects, currentPage: 1, totalPages: 1 };
    }

    @Get('supervisor/courses/:id')
    @NoGlobalInterceptor()
    @Render('supervisor/course-detail')
    async getSupervisorCourseDetail(@Param('id') id: string) {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR',
        };
        const course = {
            id: '1',
            name: 'Khóa học Node.js',
            description: 'Học Node.js từ cơ bản đến nâng cao',
            studentCount: 25,
            status: 'active',
            createdAt: '2024-03-15',
            updatedAt: '2024-03-15',
        };

        const students = [
            {
                id: '1',
                name: 'Trần Văn B',
                email: 'student1@example.com',
                joinedAt: '2024-03-15',
            },
            {
                id: '2',
                name: 'Lê Thị C',
                email: 'student2@example.com',
                joinedAt: '2024-03-15',
            },
        ];

        const subjects = [
            {
                id: '1',
                name: 'Node.js Cơ bản',
                taskCount: 10,
            },
            {
                id: '2',
                name: 'Node.js Nâng cao',
                taskCount: 8,
            },
        ];

        return { user, course, students, subjects };
    }

    @Get('supervisor/subjects/:id')
    @NoGlobalInterceptor()
    async getSupervisorSubjectDetail(@Res() res: Response, @Param('id') id: string) {
        return res.render('supervisor/subject-detail', { id });
    }

    @Get('supervisor/courses/create')
    @Render('supervisor/new-course')
    @NoGlobalInterceptor()
    getNewCoursePage() {
        return {
            title: 'Tạo khóa học mới',
        };
    }
}

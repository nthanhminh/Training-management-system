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
        const data = {
            courses: [
                {
                    id: 1,
                    title: 'Lập trình Web với Node.js',
                    description:
                        'Học cách xây dựng ứng dụng web với Node.js và Express',
                    image: 'https://picsum.photos/300/200',
                    instructor: 'Nguyễn Văn A',
                    duration: '8 giờ',
                },
                {
                    id: 2,
                    title: 'React.js Cơ bản đến Nâng cao',
                    description: 'Làm chủ React.js từ cơ bản đến nâng cao',
                    image: 'https://picsum.photos/300/201',
                    instructor: 'Trần Thị B',
                    duration: '12 giờ',
                },
                {
                    id: 3,
                    title: 'TypeScript cho Người mới bắt đầu',
                    description: 'Học TypeScript từ cơ bản đến nâng cao',
                    image: 'https://picsum.photos/300/202',
                    instructor: 'Lê Văn C',
                    duration: '6 giờ',
                },
            ],
            recentCourses: [
                {
                    id: 4,
                    title: 'Angular Framework',
                    description: 'Xây dựng ứng dụng web với Angular',
                    image: 'https://picsum.photos/300/203',
                    instructor: 'Phạm Thị D',
                    duration: '10 giờ',
                },
                {
                    id: 5,
                    title: 'Vue.js Masterclass',
                    description: 'Học Vue.js từ cơ bản đến nâng cao',
                    image: 'https://picsum.photos/300/204',
                    instructor: 'Hoàng Văn E',
                    duration: '9 giờ',
                },
            ],
            personalCourses: [
                {
                    id: 6,
                    title: 'MongoDB Database',
                    description: 'Làm chủ MongoDB cho ứng dụng web',
                    image: 'https://picsum.photos/300/204',
                    instructor: 'Ngô Thị F',
                    duration: '7 giờ',
                },
            ],
        };

        return res.render('home', data);
    }

    @Get('auth')
    @NoGlobalInterceptor()
    getAuthPage(@Query('mode') mode: string, @Res() res: Response) {
        const isLogin = mode !== 'register';
        return res.render('auth', { isLogin });
    }

    @Get('courses/:id')
    @NoGlobalInterceptor()
    getCourseDetailPage(@Param('id') id: string, @Res() res: Response) {
        const course = {
            id: parseInt(id),
            title: 'Lập trình Web với Node.js',
            instructor: 'Nguyễn Văn A',
            duration: '8 giờ',
            totalStudents: 1234,
            level: 'Trung cấp',
            language: 'Tiếng Việt',
            lastUpdated: '01/01/2024',
            enrolled: true,
            modules: [
                {
                    id: 1,
                    title: 'Module 1: Giới thiệu về Node.js',
                    duration: '2 giờ',
                    completed: false,
                    completedLessons: 1,
                    totalLessons: 2,
                    lessons: [
                        {
                            id: 1,
                            title: 'Node.js là gì?',
                            duration: '30 phút',
                            active: true,
                            completed: true,
                            videoUrl: 'https://example.com/video1.mp4',
                            description: 'Tìm hiểu về Node.js, lịch sử phát triển và các đặc điểm nổi bật'
                        },
                        {
                            id: 2,
                            title: 'Tại sao nên sử dụng Node.js?',
                            duration: '45 phút',
                            active: false,
                            completed: false,
                            videoUrl: 'https://example.com/video2.mp4',
                            description: 'Phân tích các ưu điểm và trường hợp sử dụng Node.js'
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Module 2: Cài đặt và Cấu hình',
                    duration: '1.5 giờ',
                    completed: false,
                    completedLessons: 0,
                    totalLessons: 2,
                    lessons: [
                        {
                            id: 3,
                            title: 'Cài đặt Node.js',
                            duration: '30 phút',
                            active: false,
                            completed: false,
                            videoUrl: 'https://example.com/video3.mp4',
                            description: 'Hướng dẫn cài đặt Node.js trên các hệ điều hành khác nhau'
                        },
                        {
                            id: 4,
                            title: 'Cấu hình môi trường',
                            duration: '30 phút',
                            active: false,
                            completed: false,
                            videoUrl: 'https://example.com/video4.mp4',
                            description: 'Cấu hình môi trường phát triển cho Node.js'
                        }
                    ]
                }
            ],
            students: [
                {
                    id: 1,
                    name: 'Nguyễn Văn B',
                    email: 'nguyenvanb@example.com',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                    progress: 75
                },
                {
                    id: 2,
                    name: 'Trần Thị C',
                    email: 'tranthic@example.com',
                    avatar: 'https://i.pravatar.cc/150?img=2',
                    progress: 50
                },
                {
                    id: 3,
                    name: 'Lê Văn D',
                    email: 'levand@example.com',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                    progress: 25
                }
            ]
        };

        return res.render('course-detail', { course });
    }

    @Get('my-courses')
    @NoGlobalInterceptor()
    getMyCoursesPage(@Res() res: Response) {
        return res.render('my-courses');
    }

    @Get('course/:id')
    @NoGlobalInterceptor()
    getCourseLearningPage(@Param('id') id: string, @Res() res: Response) {
        const course = {
            id: parseInt(id),
            title: 'Lập trình Web với Node.js',
            instructor: 'Nguyễn Văn A',
            duration: '8 giờ',
            modules: [
                {
                    id: 1,
                    title: 'Module 1: Giới thiệu về Node.js',
                    duration: '2 giờ',
                    completed: false,
                    completedLessons: 1,
                    totalLessons: 2,
                    lessons: [
                        {
                            id: 1,
                            title: 'Node.js là gì?',
                            duration: '30 phút',
                            active: true,
                            completed: true,
                            videoUrl: 'https://example.com/video1.mp4',
                            description: 'Tìm hiểu về Node.js, lịch sử phát triển và các đặc điểm nổi bật'
                        },
                        {
                            id: 2,
                            title: 'Tại sao nên sử dụng Node.js?',
                            duration: '45 phút',
                            active: false,
                            completed: false,
                            videoUrl: 'https://example.com/video2.mp4',
                            description: 'Phân tích các ưu điểm và trường hợp sử dụng Node.js'
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Module 2: Cài đặt và Cấu hình',
                    duration: '1.5 giờ',
                    completed: false,
                    completedLessons: 0,
                    totalLessons: 2,
                    lessons: [
                        {
                            id: 3,
                            title: 'Cài đặt Node.js',
                            duration: '30 phút',
                            active: false,
                            completed: false,
                            videoUrl: 'https://example.com/video3.mp4',
                            description: 'Hướng dẫn cài đặt Node.js trên các hệ điều hành khác nhau'
                        },
                        {
                            id: 4,
                            title: 'Cấu hình môi trường',
                            duration: '30 phút',
                            active: false,
                            completed: false,
                            videoUrl: 'https://example.com/video4.mp4',
                            description: 'Cấu hình môi trường phát triển cho Node.js'
                        }
                    ]
                }
            ]
        };

        const currentLesson = course.modules[0].lessons[0];

        return res.render('course', { course, currentLesson });
    }
}

import { Controller, Get, Query, Param, Res, Render, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
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

    @Get('supervisor/auth')
    @NoGlobalInterceptor()
    getSupervisorAuthPage(@Query('mode') mode: string, @Res() res: Response) {
        const isLogin = mode !== 'register';
        return res.render('supervisor/auth', { isLogin });
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

    @Get('supervisor')
    @Render('supervisor/home')
    @NoGlobalInterceptor()
    async getSupervisorHome(@Req() req: Request) {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR'
        };
        const stats = {
            courseCount: 5,
            subjectCount: 15,
            taskCount: 30
        };

        const recentCourses = [
            {
                id: '1',
                name: 'Khóa học Node.js',
                studentCount: 25,
                status: 'active'
            },
            {
                id: '2',
                name: 'Khóa học React',
                studentCount: 30,
                status: 'active'
            }
        ];

        return { user, stats, recentCourses };
    }

    @Get('supervisor/courses')
    @Render('supervisor/courses')
    @NoGlobalInterceptor()
    async getSupervisorCourses(@Req() req: Request) {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR'
        };
        const courses = [
            {
                id: '1',
                name: 'Khóa học Node.js',
                description: 'Học Node.js từ cơ bản đến nâng cao',
                studentCount: 25,
                createdAt: '2024-03-15',
                status: 'active'
            },
            {
                id: '2',
                name: 'Khóa học React',
                description: 'Học React và Redux',
                studentCount: 30,
                createdAt: '2024-03-10',
                status: 'active'
            }
        ];

        return { user, courses, currentPage: 1, totalPages: 1 };
    }

    @Get('supervisor/subjects')
    @Render('supervisor/subjects')
    @NoGlobalInterceptor()
    async getSupervisorSubjects(@Req() req: Request) {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR'
        };
        const subjects = [
            {
                id: '1',
                name: 'Node.js Cơ bản',
                courseName: 'Khóa học Node.js',
                taskCount: 10,
                createdAt: '2024-03-15'
            },
            {
                id: '2',
                name: 'React Hooks',
                courseName: 'Khóa học React',
                taskCount: 8,
                createdAt: '2024-03-10'
            }
        ];

        const courses = [
            {
                id: '1',
                name: 'Khóa học Node.js'
            },
            {
                id: '2',
                name: 'Khóa học React'
            }
        ];

        return { user, subjects, courses, currentPage: 1, totalPages: 1 };
    }

    @Get('supervisor/tasks')
    @Render('supervisor/tasks')
    @NoGlobalInterceptor()
    async getSupervisorTasks(@Req() req: Request) {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR'
        };
        const tasks = [
            {
                id: '1',
                title: 'Bài tập Node.js - Express',
                contentLink: 'https://example.com/task1',
                subjectName: 'Node.js Cơ bản',
                createdAt: '2024-03-15'
            },
            {
                id: '2',
                title: 'Bài tập React - Components',
                contentLink: 'https://example.com/task2',
                subjectName: 'React Hooks',
                createdAt: '2024-03-10'
            }
        ];

        const subjects = [
            {
                id: '1',
                name: 'Node.js Cơ bản'
            },
            {
                id: '2',
                name: 'React Hooks'
            }
        ];

        return { user, tasks, subjects, currentPage: 1, totalPages: 1 };
    }

    @Get('supervisor/courses/:id')
    @NoGlobalInterceptor()
    @Render('supervisor/course-detail')
    async getSupervisorCourseDetail(@Req() req: Request, @Param('id') id: string) {
        const user = {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'supervisor@example.com',
            role: 'SUPERVISOR'
        };
        const course = {
            id: '1',
            name: 'Khóa học Node.js',
            description: 'Học Node.js từ cơ bản đến nâng cao',
            studentCount: 25,
            status: 'active',
            createdAt: '2024-03-15',
            updatedAt: '2024-03-15'
        };

        const students = [
            {
                id: '1',
                name: 'Trần Văn B',
                email: 'student1@example.com',
                joinedAt: '2024-03-15'
            },
            {
                id: '2',
                name: 'Lê Thị C',
                email: 'student2@example.com',
                joinedAt: '2024-03-15'
            }
        ];

        const subjects = [
            {
                id: '1',
                name: 'Node.js Cơ bản',
                taskCount: 10
            },
            {
                id: '2',
                name: 'Node.js Nâng cao',
                taskCount: 8
            }
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
            title: 'Tạo khóa học mới'
        };
    }
}
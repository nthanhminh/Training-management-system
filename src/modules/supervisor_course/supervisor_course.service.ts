import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { SupervisorCourse } from './entity/supervisor_course.entity';
import { SupervisorCourseRepository } from '@repositories/supervisor_course.repository';

@Injectable()
export class SupervisorCourseService extends BaseServiceAbstract<SupervisorCourse> {
    constructor(
        @Inject('SUPERVISOR_COURSE_REPOSITORY')
        private readonly supervisorCourseRepository: SupervisorCourseRepository,
    ) {
        super(supervisorCourseRepository);
    }
}

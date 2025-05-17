import { Inject, Injectable } from "@nestjs/common";
import { BaseServiceAbstract } from "src/services/base/base.abstract.service";
import { CourseSubject } from "./entity/course_subject.entity";
import { CourseSubjectRepository } from "@repositories/course_subject.repository";

@Injectable()
export class CourseSubjectService extends BaseServiceAbstract<CourseSubject> {
    constructor(
        @Inject('COURSE_SUBJECT_REPOSITORY')
        private readonly courseSubjectRepository: CourseSubjectRepository
    ) {
        super(courseSubjectRepository);
    }
}
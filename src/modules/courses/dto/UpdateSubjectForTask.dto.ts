import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class UpdateSubjectForCourseDto {
    @ApiProperty({
        required: true,
        isArray: true,
        type: String,
        example: ['5f88e78d-8389-4701-bdf6-f174403f0105'],
    })
    @IsArray()
    @IsUUID('4', { each: true })
    subjectIds: string[];
}

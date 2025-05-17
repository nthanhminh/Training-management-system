import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteSubjectCourseDto {
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4')
    subjectId: string;
}

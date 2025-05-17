import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateSubjectDto {
    @ApiProperty({
        required: true,
        default: 'Subject 1',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
        default: 'Description 1',
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        required: true,
        default: [
            {
                contentFileLink: 'https://www.youtube.com/watch?v=rw4dqBDKbYc',
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TaskDto)
    tasks: TaskDto[];
}

export class TaskDto {
    @ApiProperty({
        required: true,
        default: 'https://www.youtube.com/watch?v=rw4dqBDKbYc',
    })
    @IsNotEmpty()
    contentFileLink: string;
}

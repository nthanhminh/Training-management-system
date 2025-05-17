import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendMailDto {
    @ApiProperty({
        description: 'subject',
        default: 'subject',
        required: true,
    })
    @IsNotEmpty()
    subject: string;

    @ApiProperty({
        description: 'content',
        default: 'content',
        required: true,
    })
    @IsNotEmpty()
    content: string;
}

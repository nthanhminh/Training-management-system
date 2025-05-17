import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsUUID } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    contentFileLink: string

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsUUID('4')
    subjectId: string
}
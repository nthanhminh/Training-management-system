import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ECourseStatus } from '../enum/index.enum';
import { IsDateFormatDDMMYYYY } from 'src/validators/date.validator';

export class CreateCourseDto {
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
        enum: ECourseStatus,
        default: ECourseStatus.DISABLED,
    })
    @IsEnum(ECourseStatus)
    @IsOptional()
    status?: ECourseStatus;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsDateFormatDDMMYYYY({ message: 'Date must be in format dd/mm/yyyy' })
    startDate: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsDateFormatDDMMYYYY({ message: 'Date must be in format dd/mm/yyyy' })
    endDate: string;
}

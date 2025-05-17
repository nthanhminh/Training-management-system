import { ApiProperty } from '@nestjs/swagger';
import { ERolesUser, EStatusUser } from '../enums/index.enum';
import { IsOptional } from 'class-validator';

export class CreateNewUserDto {
    @ApiProperty({
        required: true,
    })
    name: string;

    @ApiProperty({
        required: true,
    })
    password: string;

    @ApiProperty({
        required: true,
    })
    email: string;

    @ApiProperty({
        required: false,
        enum: ERolesUser,
    })
    @IsOptional()
    role?: ERolesUser;

    @ApiProperty({
        required: false,
        enum: EStatusUser,
    })
    @IsOptional()
    status?: EStatusUser;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { EEnvironment } from '../enum/index.enum';
import { ERolesUser } from '@modules/users/enums/index.enum';

export class BaseAuthDto {
    @ApiProperty({
        default: 'trainee@gmail.com',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        default: EEnvironment.TRAINEE,
        required: true,
        enum: EEnvironment,
    })
    @IsEnum(EEnvironment)
    environment: EEnvironment;

    @ApiProperty({
        default: ERolesUser.TRAINEE,
        required: true,
        enum: ERolesUser,
    })
    @IsEnum(ERolesUser)
    role: ERolesUser;
}

export class SignInDto extends BaseAuthDto {
    @ApiProperty({
        required: true,
        default: 'Test@#123',
    })
    @IsNotEmpty()
    password: string;
}

export class SignUpDto extends BaseAuthDto {
    @ApiProperty({
        required: true,
        default: 'Test@#123',
    })
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({
        required: true,
        default: 'trainee',
    })
    @IsNotEmpty()
    name: string;
}

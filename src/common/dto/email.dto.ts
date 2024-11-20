import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    default: 'admin@gmail.com',
  })
  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;
}

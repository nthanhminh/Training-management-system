import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AppResponse } from 'src/types/common.type';
import { User } from '@modules/users/entity/user.entity';
import { LocalAuthGuard } from './guards/local.guard';
import { RequestWithUser } from 'src/types/requests.type';

@Controller('auth')
@ApiTags('auths')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async handleLogin(@Request() req: RequestWithUser, @Body() dto: SignInDto): Promise<AppResponse<User>> {
        return {
            data: req.user,
        };
    }

    @Post('signUp')
    async handleSignUp(@Body() dto: SignUpDto): Promise<AppResponse<User>> {
        return {
            data: await this.authService.signUp(dto),
        };
    }

    @Get('status')
    async getAuthStatus(@Request() req: RequestWithUser): Promise<AppResponse<any>> {
        return {
            data: req.user,
        };
    }
}

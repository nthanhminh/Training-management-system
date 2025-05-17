import { UsersService } from "@modules/users/user.services";
import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto/auth.dto";
import * as argon2 from 'argon2';
import { User } from "@modules/users/entity/user.entity";
import { LocalAuthGuard } from "./guards/local.guard";
import { EEnvironment } from "./enum/index.enum";
import { ERolesUser, EStatusUser } from "@modules/users/enums/index.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ) {}

    async signIn(dto: SignInDto) : Promise<User> {
        const {email, password, environment} = dto;
        const user: User = await this.userService.findByEmail(email);
        if(!user) {
            throw new UnauthorizedException('auths.Email is not exists');
        }
        const passwordIsCorrect : boolean = await this.verifyPassword(password, user.password);
        if(!passwordIsCorrect) {
            throw new UnauthorizedException('auths.Email or Password is not correct');
        }
        const checkRoleIsSuitableWithEnvironment : boolean = this._checkRoleIsSuitableWithEnvironment(environment, user.role);
        if(!checkRoleIsSuitableWithEnvironment) {
            throw new UnauthorizedException('auths.Email or Password is not correct');
        }
        return user;
    }

    _getUserRoleFromEnvironment(environment: EEnvironment) : ERolesUser {
        switch (environment) {
            case EEnvironment.SUPERVISOR:
                return ERolesUser.SUPERVISOR;
            case EEnvironment.TRAINEE:
                return ERolesUser.TRAINEE;
        }
    }

    _checkRoleIsSuitableWithEnvironment(environment: EEnvironment, role: ERolesUser) : boolean {
        if(
            (environment === EEnvironment.SUPERVISOR && role === ERolesUser.SUPERVISOR)  ||
            (environment === EEnvironment.TRAINEE && role === ERolesUser.TRAINEE)
        ) {
            return true;
        }
        return false;
    }

    async signUp(dto: SignUpDto) : Promise<User> {
        const { email ,password, name, environment, role} = dto;
        if(!this._checkRoleIsSuitableWithEnvironment(environment, role)) {
            throw new UnprocessableEntityException('auths.Please using correct platform')
        }
        const user: User = await this.userService.findByEmail(email);
        if(user) {
            throw new NotFoundException('auths.Email is exists');
        }
        const hashedPassword: string = await argon2.hash(password);
        return await this.userService.create({
            email,
            password: hashedPassword,
            name,
            status: role === ERolesUser.SUPERVISOR ? EStatusUser.INACTIVE : EStatusUser.ACTIVE
        });
    }

    async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await argon2.verify(hashedPassword, plainTextPassword);
        } catch (err) {
            return false;
        }
    }
}
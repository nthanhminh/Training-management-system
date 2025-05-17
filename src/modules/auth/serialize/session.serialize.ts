import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/entity/user.entity';
import { UsersService } from '@modules/users/user.services';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UsersService) {
        super();
    }

    serializeUser(user: User, done: Function) {
        done(null, {
            userId: user.id,
            email: user.email,
            role: user.role,
        });
    }

    async deserializeUser(
        payload: {
            userId: string;
            email: string;
            role: string;
        },
        done: Function,
    ) {
        const { userId } = payload;
        const user = await this.userService.findUserById(userId);
        done(null, user);
    }
}

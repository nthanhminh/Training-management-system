import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/auth.dto';
import { Request } from 'express';
import { EStatusUser } from '@modules/users/enums/index.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,   
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(req: Request): Promise<any> {
    const dto: SignInDto = req.body;
    const user = await this.authService.signIn(dto);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.status === EStatusUser.INACTIVE) {
      throw new UnauthorizedException('auths.This account is not actived')
    }
    return user; 
  }
}
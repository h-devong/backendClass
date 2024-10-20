import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, //
  ) {}
  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // 1.이메일이 일치하는 유저들 디비에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면 에러
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // 3. 일치하는 유저가 있지만 비번이 틀릴경우
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀림');

    // 4. 일치하는 유저도 있고 비밀번호가 맞을 경우
    // => accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
}

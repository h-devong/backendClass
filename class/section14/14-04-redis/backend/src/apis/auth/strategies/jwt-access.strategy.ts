import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.headers.Authorization;
      //   const accessToken = temp.tpLowercase().replace("bearer ", '')
      //   return accessToken;
      // }, // access토큰
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // {sub: asdfdsafsdafsa(UserId)}

    return {
      id: payload.sub,
    };
  }
}

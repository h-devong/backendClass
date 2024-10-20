import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);

        const cookie = req.headers.cookie;

        if (!cookie) return null;

        // 쿠키를 파싱하여 refreshToken 추출
        const cookies = cookie.split(';').reduce((acc, curr) => {
          const [key, value] = curr.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});

        const refreshToken = cookies['refreshToken'];
        return refreshToken || null;
      },
      secretOrKey: '나의리프레시비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // {sub: asdfdsafsdafsa(UserId)}

    return {
      id: payload.sub,
    };
  }
}

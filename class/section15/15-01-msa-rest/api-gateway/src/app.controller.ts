import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Post('/auth/login')
  login() {
    //auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { qqq: 'name' }, //서비스 이름
      { email: 'a@a.com', password: '1234' }, //데이터
    );
  }
  @Get('/boards')
  fetchBoards() {
    //resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchboards' }, {});
  }
}

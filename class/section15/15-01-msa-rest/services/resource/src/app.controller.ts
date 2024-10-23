import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'fetchboards' })
  fetchBoards() {
    //데이터 조회 하기
    return '게시글 데이터';
  }
}

import { Injectable, Scope } from '@nestjs/common';
//인젝션 스코프 =>  default : 싱글톤()
//                request : 매 요청마다 new 생성
//                transient: 매 주입 마다 new 생성
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interface/boards-service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다',
        contents: '안녕하세요',
      },
      {
        number: 2,
        writer: '철수',
        title: '제목입니다',
        contents: '안녕하세요',
      },
      {
        number: 3,
        writer: '철수',
        title: '제목입니다',
        contents: '안녕하세요',
      },
    ];
    // 2. DB에서 꺼내온 결과를 브라우저에  응답 주기
    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    //(parent, args, context, info)
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2.DB에 접속후 데이터를 저장 => 데이터를 저장했다고 가정

    // 3. db에 저장된 결과를 브라우저에 응답 주기
    return '게시물등록 성공';
  }
}

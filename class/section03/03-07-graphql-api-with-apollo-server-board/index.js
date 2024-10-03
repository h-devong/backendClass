import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyResultType{
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoard: MyResultType 객체 1개를 의미
    fetchBoard: [MyResultType] # 배열 안에 객체 1개 이상을 의미!
}

  type Mutation {
    # createBoard(writer: String , title: String, contents: String): String
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoard: (parent, args, context, info) => {
      // 1. db에 접속 후 , 데이터 조회 => 데이터를 조회 했다고 가정
      const result = [
        { number: 1, writer: '철수', title: '제목입니다', contents: '안녕하세요' },
        { number: 2, writer: '철수', title: '제목입니다', contents: '안녕하세요' },
        { number: 3, writer: '철수', title: '제목입니다', contents: '안녕하세요' },
      ];
      // 2. DB에서 꺼내온 결과를 브라우저에  응답 주기
      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      //(parent, args, context, info)
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);

      // 2.DB에 접속후 데이터를 저장 => 데이터를 저장했다고 가정

      // 3. db에 저장된 결과를 브라우저에 응답 주기
      return '게시물등록 성공';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true, // 모든 사이트 허용하고 싶을때
  // cors:{ origin: ["https://naver.com", "https://daum.net"]} // 특정 사이트만 지정하고 싶을때
});

startStandaloneServer(server); // 4000

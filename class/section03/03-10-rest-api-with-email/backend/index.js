// const express =  require('express') // 옛날 방식 => commonjs
import { checkPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkEmail, getWelcomeTemplate, sendToEmail } from './email.js';
import express from 'express'; // 요즘 방식 => module
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', function (req, res) {
  // 1. db에 접속 후 , 데이터 조회 => 데이터를 조회 했다고 가정
  const result = [
    { number: 1, writer: '철수', title: '제목입니다', contents: '안녕하세요' },
    { number: 2, writer: '철수', title: '제목입니다', contents: '안녕하세요' },
    { number: 3, writer: '철수', title: '제목입니다', contents: '안녕하세요' },
  ];
  // 2. DB에서 꺼내온 결과를 브라우저에  응답 주기

  res.send(result);
});

app.post('/boards', function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log('=============');
  console.log(req.body);

  // 2.DB에 접속후 데이터를 저장 => 데이터를 저장했다고 가정
  res.send('게시물 저장에 성공하셨습니다');
});

app.post('/tokens/phone', function (req, res) {
  // 1. 휴대폰 번호 자리수 맞는 지 확인하기 10에서 11자리
  const myPhone = req.body.qqq;
  const isVaild = checkPhone(myPhone);
  if (isVaild === false) return;

  //2.토큰 6자리 만들기
  const myToken = getToken();

  //3.핸드폰 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
  res.send('인증완료');
});

app.post('/users', function (req, res) {
  const { name, age, school, email } = req.body;

  //1. 이메일이 정상인지 확인(1- 존재여부, 2-"@"포함여부)
  const isVaild = checkEmail(email);
  if (isVaild === false) return;

  //2.가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendToEmail(email, template);
  console.log(res);
  res.send('가ㅣ입');
});

app.listen(3000);

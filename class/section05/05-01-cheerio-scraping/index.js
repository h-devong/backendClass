import axios from 'axios';
import * as cheerio from 'cheerio';

const createMessage = async () => {
  //입력된 메시지: "안녕하세용 https://www.naver.com 에 방문해주세요"
  //1. 입력된 메시지에사 http로 시작하는 문장이 있는지 확인하기
  const url = 'https://www.naver.com';

  //2. axios.get요청으로 요처해서 html코드 방아오기 => 스크래핑
  const result = await axios.get(url);
  console.log(result.data);
  //3. 스크래핑 결과에서 og 코드를 골라내서 변수에 담기 => cheerio 도움 받기\
  const $ = cheerio.load(result.data);

  $('meta').each((index, el) => {
    if ($(el).attr('property') && $(el).attr('property'.includes('og:'))) {
      const key = $(el).attr('property'); // og:title, og:name
      const value = $(el).attr('content');
      console.log(key, value);
    }
  });
};

createMessage();

import axios from 'axios';
//비동기 방식
function fetchAsync() {
  const result = axios.get('http://koreanjson.com/post/1');

  console.log('비동기 방식:', result);
}

//동기 방식
// async function fetchSync() {              => 함수 중복 선언 문제를 피하자
//   const result = await axios.get('http://koreanjson.com/post/1');

//   console.log('비동기 방식:', result);
//   consolo.log('동기방식:', result.data.title);
// }

const fetchSync = async () => {
  const result = await axios.get('http://koreanjson.com/post/1');

  console.log('비동기 방식:', result);
  consolo.log('동기방식:', result.data.title);
};

fetchSync();
fetchAsync();

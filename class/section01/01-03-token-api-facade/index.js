function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log('번호 제대로 입력');
    return false;
  } else {
    return true;
  }
}

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  console.log(result);
  return result;
}

function sendTokenToSMS(myPhone, result) {
  console.log(myPhone + '번호로 인증번호' + result + '를 전송합니다');
}

function createTokenOfPhone(myPhone) {
  // 1. 휴대폰 번호 자리수 맞는 지 확인하기 10에서 11자리
  const isVaild = checkPhone(myPhone);
  if (isVaild === false) return;

  //2.토큰 6자리 만들기
  const myToken = getToken();

  //3.핸드폰 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
}
createTokenOfPhone('01035208042');

// 안좋은 예시
// function createTokenOfPhone(phoneNum) {
//   // 1. 휴대폰 번호 자리수 맞는 지 확인하기 10에서 11자리
//   if (qqq.length >= 10) {
//     if (qqq.length <= 11) {
//       //2.토큰 6자리 만들기
//       const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
//       console.log(result);
//       //3.핸드폰 토큰 전송하기
//       copsole.log(qqq + '번호로 인증번호' + result + '를 전송합니다');
//     } else {
//       console.log('번호 제대로 입력');
//     }
//   } else {
//     console.log('번호 제대로 입력');
//   }
// }

//좋은 예시
function createTokenOfPhone(phoneNum) {
  // 1. 휴대폰 번호 자리수 맞는 지 확인하기 10에서 11자리
  if (phoneNum.length < 10 || phoneNum.length > 11) {
    console.log('번호 제대로 입력');
    return;
  }

  //2.토큰 6자리 만들기
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  console.log(result);

  //3.핸드폰 토큰 전송하기
  console.log(phoneNum + '번호로 인증번호' + result + '를 전송합니다');
}
createTokenOfPhone('01035208042');

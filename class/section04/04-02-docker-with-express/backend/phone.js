import coolsms from 'coolsms-node-sdk';
import dotenv from 'dotenv';
dotenv.config();

const mysms = coolsms.default;

export function checkPhone(myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log('번호 제대로 입력');
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  console.log(result);
  return result;
}

export async function sendTokenToSMS(myPhone, result) {
  const messageService = new mysms(process.env.MYSMS_API_KEY, process.env.MYSMS_API_SECRET);
  const res = await messageService.sendOne({
    to: myPhone,
    from: '01035208042',
    text: `하이헬로우 마이네임 이즈 지성이 인증번호는 ${result}데스`,
  });
  console.log(res);
  console.log(myPhone + '번호로 인증번호' + result + '를 전송합니다');
}

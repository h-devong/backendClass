import nodemailer from 'nodemailer';
import { getToday } from './untils.js';
export const checkEmail = (email) => {
  if (email === undefined || email.includes('@') === false) {
    console.log('이메일을 확인해주삼요들레이오');
    return false;
  } else {
    return true;
  }
};

export const getWelcomeTemplate = ({ name, age, school, createdAt }) => {
  const template = `
    <html>
      <body>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width:500px;">
            <h1>철수님 가입을 환영합니다</h1>
            <hr/>
            <div style="color:blue;">이름: ${name}</div>
            <div>나이: ${age}짤</div>
            <div>학교: ${school}</div>
            <div>가입일: ${getToday()}</div>
          </div>
        </div>
      </body>
    </html>
  `;
  return template;
};

export const sendToEmail = async (email, template) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wltjddl0327@gmail.com',
      pass: 'oawq izsv aqed egli',
    },
  });
  await transporter.sendMail({
    from: 'wltjddl0327@gmail.com',
    to: email,
    subject: '가입축하요 ㅋㅋ',
    html: template,
  });

  // console.log(`${email}에 ${template}을 보냈습니다!`);
};

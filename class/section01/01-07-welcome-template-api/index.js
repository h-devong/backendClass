const checkEmail = (email) => {
  if (email === undefined || email.includes('@') === false) {
    console.log('이메일을 확인해주삼요들레이오');
    return false;
  } else {
    return true;
  }
};

const getWelcomeTemplate = ({ name, age, school, createdAt }) => {
  const template = `
    <html>
      <body>
        <h1>철수님 가입을 환영합니다</h1>
        <hr/>
        <div>이름: ${name}</div>
        <div>나이: ${age}짤</div>
        <div>학교: ${school}</div>
        <div>가입일: ${createdAt}</div>
      </body>
    </html>
  `;
  return template;
};

const sendToEmail = (email, template) => {
  console.log(`${email}에 ${template}을 보냈습니다!`);
};

function createUser({ name, age, school, email, createdAt }) {
  //1. 이메일이 정상인지 확인(1- 존재여부, 2-"@"포함여부)
  const isVaild = checkEmail(email);
  if (isVaild === false) return;

  //2.가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, age, school, createdAt });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendToEmail(email, template);
}

const name = '철수';
const age = 9;
const school = '다람쥐 초등학교';
const email = 'a@a.com';
const createdAt = new Date();
createUser({ name, age, school, email, createdAt });

const qqq = (qqq) => {
  console.log(qqq);
  console.log(qqq.name);
  console.log(qqq.age);
  console.log(qqq.school);
};

const name = '철수';
const age = 12;
const school = '다람쥐 초등학교';

// const profile = {
//   name: '철수',
//   age: 12,
//   school: '다람쥐 초등학교',
// };

const profile = { name, age, school };

qqq(profile);

qqq({ name, age, school });

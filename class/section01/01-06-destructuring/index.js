//구조분해 할당 예제

const profile = {
  name: '철수',
  age: 12,
  school: '다람쥐 초등학교',
};

const { name, school } = profile;

console.log(name);
console.log(school);

function zzz(zzz) {
  console.log(zzz);
}

zzz('사과');

//객체 전달하기 - 구조 분해 할당
function zzz({ apple, banana }) {
  console.log(apple);
  console.log(banana);
}
const basket = {
  apple: 3,
  banana: 4,
};
zzz(basket);

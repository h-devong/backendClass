// class Date {
//   qqq = 3

//   getFullYear(){

//   }
// }

const date = new Date();
console.log(date.getFullYear());

class Monster {
  hp = 100;
  mp = 100;
  power = 10; //  앞에 this가 생략 되어있음 즉. this.power

  // 생성자
  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log('공격하자');
    console.log('내 공격력은 ' + this.power + '야!!');
  };

  run = () => {
    console.log('도망가자');
  };
}

const mymonster1 = new Monster(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new Monster(10);
mymonster2.attack();
mymonster2.run();
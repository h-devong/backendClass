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

class 공중몬스터 extends Monster {
  constructor(aaa) {
    super(aaa + 1);
  }

  run = () => {
    console.log('날아서 동망 ㄱㄱ');
  };
}

class 지상몬스터 extends Monster {
  // overriding (부모의 run을 덮어쓰기)
  constructor(bbb) {
    super(bbb);
  }
  run = () => {
    console.log('뛰어서 동망 ㄱㄱ');
  };
}

const mymonster1 = new 공중몬스터(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new 지상몬스터(10);
mymonster2.attack();
mymonster2.run();

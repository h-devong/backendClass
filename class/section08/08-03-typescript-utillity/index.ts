interface Iprofile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

//1. partial type 모든 요소가 있어도 되고 없어도 되는 타입으로 변경됨
type aaa = Partial<IProfile>;

// 2. required type partial 반대 타입
type bbb = Required<IProfile>;

//3. 픽 타입
type ccc = Pick<IProfile, "name" | "age">;

//4. omit type
type ddd = Omit<IProfile, "school">;

//5. record type

type eee = "철수" | "영희" | "훈이"; //union 타입
let child: eee = "영희"; // eee안에 있는것에만 선택가능
let child2: string = "사과"; // 철수, 영희, 훈이 , 사과 , 바나나 다됨

type fff = Record<eee, IProfile>; //record type

//6. 객체의 key들로 union type만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby" keyof

let myprofile: ggg = "hobby";

//7. type vs interface 차이 => 선언병합
export interface IProfile {
  candy: number; //선언 병합으로 추가됨
}

//8. 배운것 응용
let profile: Partial<IProfile> = {
  candy: 10,
};

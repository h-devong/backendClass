//1.문자/숫자/ 불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};
const result = getPrimitive("철수", 123, true);

//
//2. any타입(그냥 자바 스크립트랑 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  return [arg3, arg2, arg1];
};
const result1 = getAny("철수", 123, true);

//
//3. Unknown타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
};
const result2 = getUnknown("철수", 123, true);

//
//4. genernic타입
function getGenernic<Mytype1, Mytype2, Mytype3>(arg1: Mytype1, arg2: Mytype2, arg3: Mytype3): [Mytype3, Mytype2, Mytype1] {
  return [arg3, arg2, arg1];
}
const result3 = getGenernic<string, number, boolean>("철수", 123, true);

//
//5. genernic타입 - 2
function getGenernic2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}
const result4 = getGenernic2("철수", 123, true);

//
//5. genernic타입 - 3
function getGenernic3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}
const result5 = getGenernic3("철수", 123, true);

//
//5. genernic타입 - 4
const getGenernic4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
const result6 = getGenernic4("철수", 123, true);

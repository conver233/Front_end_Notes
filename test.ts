/* 1. 实现类型标记Pick Omit  */
interface User {
  id: number;
  age: number;
  name: string;
}
type OmitUser = Omit<User, "id">;
type PickUser = Pick<User, "id" | "age">;
// a.手写pick
type MyPick<T, K extends keyof T> = {
  [k in K]: T[k];
};
type PickUser2 = MyPick<User, "age">;
// b.手写omit
type ex = Exclude<keyof User, "age">;
type MyOmit<T, K extends keyof T> = {
  [p in Exclude<keyof T, K>]: T[p];
};
type MyOmit2<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;
type OmitUser2 = MyOmit2<User, "id">;

/* 2. 什么是协变与逆变  */
// 协变 Complex(A) <: Complex(B) -> A <: B 对象，数组类型都是协变
// 逆变 Func(A) <: Func(B) -> B <: A 函数参数是逆变

/* 3. 如何实现Partial  */
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

/* 4. 什么是infer，并实现Parameter和ReturnType  */
// type a = typeof Array.isArray;
// type b = typeof parseInt;
// c: string, number | undefined;
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer P
  ? P
  : never;

type MyParameter<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

/* 4. interface和type有何区别  */
// 1.extends vs 交叉类型&
// 2.type才有联合类型
// 3.interface才有implement
// interface定义函数
interface SetPoint {
  (x: number, y: number): void;
  //   age: number;
}
let fn: SetPoint;
fn = (x: number, y) => {};

// interface声明合并
interface Point {
  x: number;
}
interface Point {
  y: number;
}
let c: Point = { x: 1, y: 3 };

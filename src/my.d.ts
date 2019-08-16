// .d.ts是声明文件，必须使用declare进行声明
// 全局变量
declare const foo: string;
// 全局函数
declare function getName(params: string): void;

// 带属性的对象 使用declare namespace描述用点表示法访问的类型或值
declare namespace myLib {
  function makeGreet(str: string): string;
  let greetCount: number;
  class Person {
    constructor(name: string, age: number);
    name: string;
    getName(): string;
  }
}
// 类型声明
interface Widget {
  name: string;
  fn: string;
}

interface GreetString {
  name: string;
  duration?: number;
  color?: string;
}

// 函数重载
declare function getWidget(count: number): Widget;
declare function getWidget(name: string): Widget[];

// 声明函数
declare class Person {
  constructor(name: string, age: number);
  name: string;
  getName(): string;
}

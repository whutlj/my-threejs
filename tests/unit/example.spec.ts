// import { shallowMount, mount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';
// import Counter from '@/components/Counter.vue';
// import Child from '@/components/Child.vue';
// import Vue from 'vue';
// import { sum } from '@/assets/js/jest';
// import sinon from 'sinon';

// function create(o: object | null) {
//   console.log('haha', o);
// }

// describe('Counter测试', () => {
//   let wrapper: any;
//   let child: any;
//   beforeAll(() => {
//     wrapper = shallowMount(Counter);
//     child = shallowMount(Child);
//   });
//   it('renders correct markup', () => {
//     expect(wrapper.html()).toContain('<span class="count">0</span>');
//   });
//   it('contains a element', () => {
//     expect(wrapper.contains('a')).not.toBeTruthy();
//   });
//   it('test click counter', () => {
//     wrapper.find('.btn').trigger('click');
//     wrapper.find('.btn').trigger('click');
//     expect(wrapper.vm.count).toBe(2);
//   });
//   it('test click prop', () => {
//     const spy = sinon.spy();
//     const toWrapper = shallowMount(Counter, {
//       propsData: {
//         propClick: spy
//       }
//     });
//     toWrapper.find('.fn-btn').trigger('click');
//     expect(spy.calledWith('yes')).toBe(true);
//   });
//   // it('snapshot test', () => {
//   //   expect(wrapper.element).toMatchSnapshot();
//   // });

//   // it('nextTick catch', done => {
//   //   Vue.config.errorHandler = done;
//   //   Vue.nextTick(() => {
//   //     expect(true).toBe(true);
//   //     done();
//   //   });
//   // });
//   it('nextTick catch', () => {
//     return Vue.nextTick().then(() => {
//       expect(true).toBe(true);
//     });
//   });
//   it('wrapper属性学习', () => {
//     const btnEle = wrapper.find('.fn-btn');
//     expect(btnEle.attributes('class')).toMatch('fn-btn');
//     expect(btnEle.classes()).toContain('fn-btn');
//     expect(wrapper.contains(Child)).toBe(true);
//   });
//   it('destroy', () => {
//     const destroyed = sinon.fake();
//     const child = shallowMount(Child, {
//       destroyed,
//       mounted: destroyed
//     });
//     child.destroy();
//     expect(destroyed.calledOnce).toBe(false);
//     const f = sinon.fake.returns(10);
//     sinon.replace(console, 'error', f);
//     const res = console.error('haha');
//     console.log(res);
//     sinon.restore();
//     expect(res).toBe(10);
//   });
// });
// describe('ts 学习', () => {
//   it('枚取类型测试', () => {
//     enum Color {
//       Green = 10,
//       Red,
//       Greey
//     }
//     const res: Color = Color.Red;
//     expect(res).toBe(11);
//   });
//   it('测试字面量参数', () => {
//     interface BaseConfig {
//       color?: string;
//       width?: number;
//       [propName: string]: any;
//     }
//     function createConfig(config: BaseConfig): { color: string | undefined; width: number | undefined } {
//       return {
//         color: config.color,
//         width: config.width
//       };
//     }
//     // 1.类型断言 2.不使用字面对象，使用变量，但是必须前提是有公共的属性 3.使用propName, typescript添加了类型声明，类型检查，规定了参数类型与返回类型，规范化
//     createConfig({ colour: 'ahh', width: 20 });
//     interface BaseArray {
//       [index: number]: number;
//       length: number;
//     }
//     let arr: BaseArray;
//     arr = [1, 2, 4];
//     const baseArr: any[] = [1, '3', 3];
//     expect(arr.length).toBe(3);
//     expect(baseArr.length).toBe(3);
//   });
//   it('interface', () => {
//     class Control {
//       private state: number = 0;
//     }
//     interface MinControl extends Control {
//       setName(str: string): string;
//     }

//     class Image extends Control implements MinControl {
//       public setName(str: string) {
//         return '1233';
//       }
//     }
//     const image = new Image();
//     const res = image.setName('12');
//     expect(res === '1233');
//     class DeclareClass {
//       constructor(readonly name: string) {}
//     }
//     const instance = new DeclareClass('lj');
//     expect(instance.name).toEqual('lj');
//     class Accessor {
//       private _fullName: string = 'lj';
//       get fullName() {
//         return this._fullName;
//       }

//       set fullName(name: string) {
//         if (name.length > 5) {
//           throw new Error('名字长度不能超过五位');
//         }
//         this._fullName = name;
//       }
//     }
//     const access = new Accessor();
//     expect(access.fullName).toEqual('lj');
//     expect(() => {
//       access.fullName = '12313131';
//     }).toThrow();
//     abstract class AbstractClass {
//       private _name: string = '';
//       setName(name: string) {
//         this._name = name;
//       }
//       get name(): string {
//         return this._name;
//       }
//       abstract getName(): string;
//     }
//     class ChildAb extends AbstractClass {
//       getName() {
//         return this.name;
//       }
//     }
//     const cInstance: AbstractClass = new ChildAb();
//     cInstance.setName('lj');
//     expect(cInstance.name).toEqual('lj');
//   });
//   it('类方法', () => {
//     class Person {
//       static staticFn: string = 'person';
//     }
//     const copyPerson: typeof Person = Person;
//     expect(copyPerson.staticFn).toEqual('person');
//   });
//   it('mock函数', () => {
//     function forEach(items: any[], callback: Function) {
//       for (let index = 0; index < items.length; index++) {
//         callback(items[index]);
//       }
//     }
//     const mockFn = jest.fn(x => x + 10);
//     forEach([2, 3], mockFn);
//     expect(mockFn.mock.calls.length).toBe(2);
//     expect(mockFn.mock.calls[0].length).toBe(1);
//     expect(mockFn.mock.results[0].value).toBe(12);
//     const mockReturn = jest.fn();
//     mockReturn
//       .mockReturnValueOnce('lj')
//       .mockReturnValueOnce(0)
//       .mockReturnValueOnce('sss')
//       .mockReturnValue(true);
//     expect(mockReturn()).toEqual('lj');
//     expect(mockReturn()).toBe(0);
//     expect(mockReturn()).toBe('sss');
//     expect(mockReturn()).toBe(true);
//     expect(mockReturn()).toBe(true);
//   });
//   it('函数类型', () => {
//     let addFn: (x: number, y: number) => number = function(x, y) {
//       return x + y;
//     };
//     expect(addFn(1, 2)).toBe(3);
//     function restFn(firstName: string, ...rest: string[]) {
//       return `${firstName} ${rest.join(' ')}`;
//     }
//     expect(restFn('1', '2', '3', '4')).toEqual('1 2 3 4');
//     interface Card {
//       suit: string;
//       card: number;
//     }
//     interface Deck {
//       suits: string[];
//       cards: number[];
//       createCardPicker(this: Deck): () => Card;
//     }
//     let deck: Deck = {
//       suits: ['hearts', 'spades', 'clubs', 'diamonds'],
//       cards: Array(52),
//       createCardPicker: function(this: Deck) {
//         // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
//         return () => {
//           let pickedCard = Math.floor(Math.random() * 52);
//           let pickedSuit = Math.floor(pickedCard / 13);

//           return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//         };
//       }
//     };

//     let cardPicker = deck.createCardPicker();
//     let pickedCard = cardPicker();
//   });
//   it('typescript泛型使用', () => {
//     interface LengthClock {
//       length: number;
//     }
//     function fanFn<U extends LengthClock, T>(name: U, age: T): U {
//       console.log(name.length);
//       return name;
//     }
//     const res = fanFn<string, number>('lj', 333);
//     expect(res).toEqual('lj');
//     function getProperty<T, K extends keyof T>(obj: T, key: K) {
//       return obj[key];
//     }
//     const obj = { a: 1, b: 2, c: 3 };
//     const val = getProperty(obj, 'a');
//     expect(val).toBe(1);
//     class Animal {
//       name: string = 'animal';
//     }
//     class Cat extends Animal {
//       constructor() {
//         super();
//         this.name = 'cat';
//       }
//     }
//     class Dog extends Animal {
//       constructor() {
//         super();
//         this.name = 'dog';
//       }
//     }
//     function createInstance<T extends Animal>(c: new () => T): T {
//       return new c();
//     }
//     const cat = createInstance(Cat);
//     const dog = createInstance(Dog);
//     const animal = createInstance(Animal);
//     enum Color {
//       Red
//     }
//     console.log(Color.Red);
//     console.log(Color[0] === 'Red');
//     expect(cat.name).toEqual('cat');
//     expect(dog.name).toEqual('dog');
//     expect(animal.name).toEqual('animal');
//   });
//   it('字符串枚举', () => {
//     enum stringEnum {
//       name = 'name1',
//       age = 'age'
//     }
//     expect(stringEnum.name).toEqual('name1');
//     enum CC {
//       A = 1,
//       B,
//       C = 2
//     }
//     interface Named {
//       name: string;
//     }
//     let str: Named;
//     const y = { name: '113' };
//     str = y;
//     expect(str.name.length).toBe(3);
//     class Person {
//       name: string = '13';
//       log(name: string): void {
//         console.log(name);
//       }
//     }
//     const instance = new Person();
//     expect(instance.hasOwnProperty('name')).toBe(true);
//     interface Padder {
//       getPaddingString(): string;
//     }

//     class SpaceRepeatingPadder implements Padder {
//       constructor(private numSpaces: number) {}
//       getPaddingString() {
//         return Array(this.numSpaces + 1).join(' ');
//       }
//       getName() {
//         return '123';
//       }
//     }
//     function getPerson(name: string, age?: number): string {
//       return `${name}${age || 0}`;
//     }
//     expect(getPerson('lj')).toEqual('lj0');
//     expect(getPerson('lj', 20)).toEqual('lj20');
//     interface Square {
//       kind: 'square';
//       size: number;
//     }
//     interface Rectangle {
//       kind: 'rectangle';
//       width: number;
//       height: number;
//     }
//     interface Circle {
//       kind: 'circle';
//       radius: number;
//     }
//     let minSquare: Square = { kind: 'square', size: 10 };
//     expect(minSquare.size).toBe(10);
//   });
//   it.only('索引类型', () => {
//     interface Person {
//       name: string;
//       age: number;
//       // [propertyName: string]: any
//     }
//     const person: Person = { name: 'person', age: 18 };
//     function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
//       return names.map((n) => o[n]);
//     }
//     const res = pluck(person, ['name', 'age']);
//     expect(res).toContain(18);
//     console.log(res);
//     type ParticalPerson<T> = {
//       readonly [P in keyof T]: T[P] // 映射类型
//     };
//     type mapPerson<T> = { [P in keyof T]?: T[P] } & { adress: string };
//     const maps: mapPerson<Person> = {
//       name: '234',
//       adress: '必选的'
//     };
//     expect(maps.age).toBeFalsy();
//     type Keys = 'options' | 'options2';
//     type se = { [P in Keys]: string };
//     type A = 'a' | 'b' | 'c' | 'd';
//     type B = 'a' | 'd';
//     type T00 = Exclude<A, B>;
//     type T01 = Extract<A, B>;
//     const a: T00 = 'b';
//     const b: T01 = 'd';
//     interface Props {
//       a?: number;
//       b?: string;
//     };

//     const obj: Props = { a: 5 }; // OK

//     const obj2: Required<Props> = { a: 5, b: '123' };
//   });
// });

// describe('vue test utils', () => {
//   it('开始测试', () => {
//     const wrapper = mount(Counter);
//     expect(wrapper.find('.not-visible').isVisible()).toBeFalsy();
//     const child = mount(Child);
//     expect(child.isVueInstance()).toBe(true);
//   });
//   it('spy', () => {
//     function func(name: string): string {
//       return `${name}: shuaige`;
//     }
//     const spy = sinon.spy(func);
//     const res = spy('李杰');
//     console.log(res);
//     expect(res).toMatch('shuaige');
//     expect(spy.calledOnce).toBe(true);
//   });
//   it('spy 2', () => {
//     const obj = {
//       method(num: number) {
//         console.log(num);
//       }
//     };
//     const spy = sinon.spy(obj, 'method');
//     obj.method(42);
//     spy.restore();
//     obj.method(42);
//     expect(spy.called).toBe(true);
//     expect(spy.withArgs(42).calledOnce).toBe(true);
//   });
// });
// // describe('HelloWorld.vue', () => {
// //   it('renders props.msg when passed', () => {
// //     const msg = 'new message';
// //     const wrapper = shallowMount(HelloWorld, {
// //       propsData: { msg }
// //     });
// //     expect(wrapper.text()).toMatch(msg);
// //   });
// // });

// // describe('方法监测', () => {
// //   it('测试counter计算', () => {
// //     expect(sum(1, 2)).toBe(3);
// //   });
// //   it('测试counter计算', () => {
// //     expect(sum(100, 2)).toBe(102);
// //   });
// //   it('测试toEqual', () => {
// //     const obj = {
// //       name: 'lj',
// //       age: 10
// //     };
// //     expect(obj).toEqual({ name: 'lj', age: 10 });
// //   });

// //   test('浮点数想加', () => {
// //     const res = 0.1 + 0.2;
// //     expect(res).toBeCloseTo(0.3);
// //   });

// //   it('正则表达式测试', () => {
// //     const str = 'i am shuai ge';
// //     expect(str).toMatch('shuai g');
// //     expect(str).toMatch(/shuai ge/);
// //   });

// //   it('数组或者可迭代对象测试', () => {
// //     const arr = ['bob', 'tom', 'jerry', 'hirry'];
// //     expect(arr).toContain('bob');
// //     expect(new Set(arr)).toContain('jerry');
// //   });

// //   it('测试抛出异常', () => {
// //     function throwErr(str: string): string | Error {
// //       if (str === '1') {
// //         throw new Error('输入内容错误');
// //       }
// //       return str;
// //     }
// //     function errorFn() {
// //       throwErr('1');
// //     }
// //     function sureFn() {
// //       throwErr('hhaa');
// //     }
// //     expect(errorFn).toThrow('输入内容错误');
// //     expect(throwErr('sss')).toBe('sss');
// //   });
// //   expect.extend({
// //     toBeWithinRange(received, floor, ceiling) {
// //       const pass = received >= floor && received <= ceiling;
// //       if (pass) {
// //         return {
// //           message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
// //           pass: true
// //         };
// //       } else {
// //         return {
// //           message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
// //           pass: false
// //         };
// //       }
// //     }
// //   });
// //   it('回调测试', done => {
// //     function fetchData(cb: Function) {
// //       setTimeout(() => {
// //         cb('cb data');
// //       }, 1000);
// //     }
// //     function cb(data: string): void {
// //       expect(data).toBe('cb data');
// //       done();
// //     }
// //     fetchData(cb);
// //   });
// //   it('promise测试回调', () => {
// //     const fetchData = () => {
// //       return new Promise((resolve, reject) => {
// //         setTimeout(() => {
// //           reject('promise');
// //         }, 1000);
// //       });
// //     };
// //     // return fetchData().then(res => {
// //     //   expect(res).toMatch('promise');
// //     // });
// //     // return expect(fetchData()).resolves.toBe('promise');
// //     return expect(fetchData()).rejects.toBe('promise');
// //   });
// //   it('catch使用', async () => {
// //     expect.assertions(1);
// //     const fetchData = () => {
// //       return new Promise((resolve, reject) => {
// //         // setTimeout(() => {
// //         reject('error');
// //         // }, 1000);
// //       });
// //     };
// //     // const fetchData = Promise.reject('error')
// //     try {
// //       await fetchData();
// //     } catch (e) {
// //       expect(e).toMatch('error');
// //     }
// //   });
// // });

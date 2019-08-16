// // 使用模块即可，根本不需要使用命名空间
export function getName(): string {
  return 'num';
}
export class DecoratorClass {
  constructor(public name?: string) {}
  /**
   * method
   */
  @f()
  @g()
  public method(name?: string) {
    console.log('method');
  }
}
function f(): any {
  console.log('f:evaluated');
  return (target: any, property: string, descriptor: PropertyDescriptor): void => {
    console.log('f: called');
  };
}
function g(): any {
  console.log('g:evaluated');
  return (target: any, property: string, descriptor: PropertyDescriptor): void => {
    console.log('g:called');
    const fn = descriptor.value;
    descriptor.value = function(...arg: any[]) {
      const name = arg[0];
      if (name === 'lj') {
        console.log('lj不执行原始方法');
      } else {
        console.log('执行原始方法', (this as DecoratorClass).name);
        fn.apply(this, arg);
      }
    };
  };
}

import Listener from './listener';

export default function(Vue) {
  return class LazyClass {
    constructor() {
      this.ListenerQueue = [];
    }
    add(el, binding) {
      console.log('添加监测', el);
      const listener = new Listener({
        el
      });
      this.ListenerQueue.push(listener);
      
    }
  };
}

import lazyFactory from './lazyFactory';

export default {
  install(Vue, options = {}) {
    // 初始化lazy实例
    const LazyClass = lazyFactory(Vue);
    const lazy = new LazyClass();
    Vue.directive('lazy', {
      bind: lazy.add.bind(lazy)
    });
  }
};

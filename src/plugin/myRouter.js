import MyFunction from '@/components/MyFunction';
import MyLink from '@/components/MyLink';
const reactLj = { name: '0.2' };
export default {
  install(Vue, options) {
    const isDef = v => v !== undefined;
    Vue.mixin({
      beforeCreate() {
        if (isDef(this.$options.router)) {
          this._myRouter = this;
          Vue.util.defineReactive(this, '_lj', reactLj);
        } else {
          this._myRouter = (this.$parent && this.$parent._myRouter);
        }
      }
    });
    Object.defineProperty(Vue.prototype, '$lj', {
      get() {
        // 当前路由, 响应式的
        return this._myRouter._lj;
      }
    });
    Vue.component('my-router', MyFunction);
    Vue.component('my-link', MyLink);
  }
};

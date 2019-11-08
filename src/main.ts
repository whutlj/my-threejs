import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Whut, { getGlobal } from 'whutlj_npm_test';
import lazyPlugin from '@/plugin/lazy';
import myRouter from '@/plugin/myRouter';
import packageJson from '../package.json';

Vue.config.productionTip = false;
Vue.use(lazyPlugin);
Vue.use(myRouter);
console.log(getGlobal());
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

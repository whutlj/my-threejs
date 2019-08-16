import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Whut, { getGlobal } from 'whutlj_npm_test';

Vue.config.productionTip = false;
console.log(getGlobal());
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

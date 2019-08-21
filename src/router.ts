import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Inter from './views/Inter.vue';
import InterCube from './views/InterCube.vue';
import Hook from './views/Hook.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      // component: About
    },
    {
      path: '/inter',
      name: 'inter',
      component: () => import(/* webpackChunkName: "inter" */ './views/Inter.vue')
      // component: Inter
    },
    {
      path: '/interCube',
      name: 'interCube',
      component: () => import(/* webpackChunkName: "interCube" */ './views/InterCube.vue')
      // component: InterCube
    },
    {
      path: '/hook',
      name: 'hook',
      component: () => import(/* webpackChunkName: "hook" */ './views/Hook.vue')
      // component: Hook
    },
    {
      path: '/line',
      name: 'line',
      component: () => import(/* webpackChunkName: "hook" */ './views/Line.vue')
      // component: Hook
    }
  ]
});

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
      path: '/pointLight',
      name: 'pointLight',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/PointLight.vue')
    },
    {
      path: '/inter',
      name: 'inter',
      component: () => import(/* webpackChunkName: "inter" */ './views/Inter.vue')
    },
    {
      path: '/interCube',
      name: 'interCube',
      component: () => import(/* webpackChunkName: "interCube" */ './views/InterCube.vue')
    },
    {
      path: '/hook',
      name: 'hook',
      component: () => import(/* webpackChunkName: "hook" */ './views/Hook.vue')
    },
    {
      path: '/sprite',
      name: 'sprite',
      component: () => import(/* webpackChunkName: "hook" */ './views/Sprite.vue')
    },
    {
      path: '/crash',
      name: 'crash',
      component: () => import(/* webpackChunkName: "hook" */ './views/Crash.vue')
    },
    {
      path: '/basic',
      name: 'basic',
      component: () => import(/* webpackChunkName: "hook" */ './views/Basic.vue')
    },
    {
      path: '/light',
      name: 'light',
      component: () => import(/* webpackChunkName: "hook" */ './views/Light.vue')
    },
    {
      path: '/spotLight',
      name: 'spotLight',
      component: () => import(/* webpackChunkName: "hook" */ './views/SpotLight.vue')
    },
    {
      path: '/texture',
      name: 'texture',
      component: () => import(/* webpackChunkName: "hook" */ './views/Texture.vue')
    }
  ]
});

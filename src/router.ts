import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import About from './views/About.vue';
// import Inter from './views/Inter.vue';
// import InterCube from './views/InterCube.vue';
// import Hook from './views/Hook.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
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
      alias: '/haha',
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
      component: () => import(/* webpackChunkName: "sprite" */ './views/Sprite.vue')
    },
    {
      path: '/crash',
      name: 'crash',
      component: () => import(/* webpackChunkName: "crash" */ './views/Crash.vue')
    },
    {
      path: '/basic',
      name: 'basic',
      component: () => import(/* webpackChunkName: "basic" */ './views/Basic.vue')
    },
    {
      path: '/light',
      name: 'light',
      component: () => import(/* webpackChunkName: "light" */ './views/Light.vue')
    },
    {
      path: '/spotLight',
      name: 'spotLight',
      component: () => import(/* webpackChunkName: "spotLight" */ './views/SpotLight.vue')
    },
    {
      path: '/texture',
      name: 'texture',
      component: () => import(/* webpackChunkName: "texture" */ './views/Texture.vue')
    },
    {
      path: '/gj',
      name: 'gj',
      component: () => import(/* webpackChunkName: "gujia" */ './views/Gujia.vue')
    },
    {
      path: '/updateTest/:plan',
      name: 'updateTest',
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter');
        next();
      },
      component: () => import(/* webpackChunkName: "hook" */ './views/UpdateTest.vue')
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  next()
})
router.afterEach((to, from) => {
  console.log('afterEach');
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve');
  next()
})

export default router;
import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index';
import recommend from '@/pages/recommend';
import radio from '@/pages/radio';
import $storage from 'store';


const context = require.context('@/pages', false, /\.vue$/);
// console.dir(context);
// console.log(context.keys());
const components = {};
context.keys().forEach((value) => {
  const comp = context(value).default;
  components[comp.name] = comp;
});
Vue.use(Router);

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/recommend',
      meta: {
        hasMenuBar: true,
      },
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: recommend,
        },
        {
          path: 'radio',
          name: 'radio',
          component: radio,
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      component: components.search,
      meta: {
        hasMenuBar: true,
      },
    },
    {
      name: 'login',
      path: '/login',
      component: components.login,
    },
    {
      name: 'rec',
      path: '/rec',
      meta: {
        login: true,
        hasMenuBar: true,
      },
      component: components.rec,
    },
    {
      name: 'register',
      path: '/register',
      meta: {
        register: true,
        hasMenuBar: true,
      },
      component: components.register,
    },
    {
      name: 'node',
      path: '/node',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.node,
    },
    {
      name: 'account',
      path: '/account',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.account,
    },
    {
      name: 'songmenu',
      path: '/songmenu',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.songmenu,
    },
    {
      name: 'trends',
      path: '/trends',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.trends,
    },
    {
      name: 'vision',
      path: '/vision',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.vision,
    },
    {
      name: 'play',
      path: '/play',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.play,
    },
    {
      name: 'my',
      path: '/my',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.my,
    },
    {
      name: 'songlist',
      path: '/songlist',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.songlist,
    },
    {
      name: 'myMessage',
      path: '/myMessage',
      meta: {
        node: true,
        hasMenuBar: true,
      },
      component: components.myMessage,
    },
  ],
});
// 守卫
route.beforeEach((to, from, next) => {
  if (to.meta.login) {
    // 需要登录
    if ($storage.get('user')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});
export default route;


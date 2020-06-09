// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import '../node_modules/normalize.css';
import axios from '../node_modules/axios';
import velocity from '../node_modules/velocity-animate';
import storage from '../node_modules/store';
import Vant from '../node_modules/vant';
import '../node_modules/vant/lib/index.css';
import menuBar from './components/menuBar/menuBar';
import vueAwesomeSwiper from '../node_modules/vue-awesome-swiper';
import '../node_modules/swiper/dist/css/swiper.min.css';
import '../src/mock';
import { store } from './store';
import App from './App';
import router from './router';
import api from './api';

Vue.component('menu-bar', menuBar);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$velocity = velocity;
Vue.prototype.$storage = storage;
Vue.prototype.$api = api;
Vue.use(vueAwesomeSwiper);
Vue.use(Vant);

Vue.directive('loading', {
  bind(el, binding) {
  },
  inserted(el, binding) {
    const loadingWarp = document.createElement('div');
    loadingWarp.style.cssText = 'width:100px;height:100px;background:red;';
    el.appendChild(loadingWarp);
    console.log(binding);
    el.dom = loadingWarp;
  },
  update(el, binding) {
    if (!binding.value) {
      el.dom.style.display = 'none';
    } else {
      el.dom.style.display = 'block';
    }
  },
  componentUpdated(el, binding) {},
  unbind(el, binding) {},

});

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  components: { App },
  template: '<App/>',
});
setTimeout(() => {
  app.$mount('#app');
}, 5000);


import menu from './menuBar';

export default {
  install(Vue) {
    Vue.component(menu.name, menu);
  },
};

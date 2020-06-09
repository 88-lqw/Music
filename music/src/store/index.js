import Vuex from 'vuex';
import Vue from 'vue';
import router from '../router';


Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    a: 1234,
    b: 'hello,world',
    banners: [],
    songArr: [],
    songs: [],
    id: '',
    songlistImgUrl: '',
    songlistName: '',
    songlistcopywriter: '',
    getplaylist: [],
    songsongs: [],
    playkey: 0,
    playid: 0,
  },
  getters: {
    reverseB(state) {
      return state.b.split('').reverse().join('');
    },
  },
  mutations: {
    getBanners(state, data) {
      state.banners = data;
    },
    getPlaylist(state, data) {
      state.songArr = data;
    },
    songClick(state, item) {
      state.id = item.id;
      state.songlistImgUrl = item.picUrl;
      state.songlistName = item.name;
      state.songlistcopywriter = item.copywriter
      router.push({ path: '/songlist' });
      console.log('!!!!');
      console.log(state.id);
    },
    getSonglist(state, data) {
      state.songs = data;
    },
    getPlaylistone(state, data) {
      state.getplaylist = data;
    },
    songlistClick(state, item) {
      state.playid = item.id;
      router.push({ path: '/play' });
      state.playkey = item.key;
    },

    addA(state, n) {
      state.a += n;
    },
    _delA(state) {
      state.a--;
    },
  },
  actions: {
    delA(store) {
      setTimeout(() => {
        store.commit('_delA');
      }, 5000);
    },
  },
});

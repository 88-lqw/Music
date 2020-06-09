import http from './http';
import { store } from '../store';
import { Dialog } from 'vant';
import router from '../router';
import axios from '../../node_modules/axios';

export default {
  getBanners(params) {
    return http.get('/banner', { params })
      .then((res) => {
        store.commit('getBanners', res.data.banners);
      })
      .catch((err) => {
        Dialog.confirm({
          title: '警告',
          message: '是否进入?',
        })
          .then(() => {
            router.push({ path: '/search', query: {} });
          });
      });
  },
  getPlaylist() {
    return http.get('/top/playlist')
      .then((res) => {
        console.log(res);
        store.commit('getPlaylist', res.data.playlists);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getSonglist() {
    return http.get(`http://localhost:3000/playlist/detail?id=${store.state.id}`)
      .then((res) => {
        store.commit('getSonglist', res.data.playlist.tracks);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getPlaylistone(params) {
    return axios.get('/api/user/playlist', { params })
      .then((res) => {
        store.commit('getPlaylistone', res.data.playlist);
      });
  },
};

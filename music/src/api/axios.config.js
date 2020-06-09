import router from '../router';
import errorHandle from './interface';
import { Dialog } from 'vant';

export default {
  transformResponse: [function (data) {
    console.log(data);
    const res = JSON.parse(data);
    if (errorHandle[res.code]) {
      router.push({ path: errorHandle[res.code].redirect });
      Dialog.alert({
        title: '提示',
        message: errorHandle[res.code].message,
      });
    }
    return res;
  }],
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  withCredentials: true, // 跨域携带cookie
  validateStatus(status) { // 根据status状态去调用resolve ==> then
    return status >= 200 && status < 300;
  },
};

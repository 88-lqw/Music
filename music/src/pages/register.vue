<template>
<div class="register">
  <div class="register-bulk">
    <img src="../img/cancel.png" @click="Return"/>
    <span class="input-bulk-h">手机号注册</span>
  </div>
  <div class="input-bulk">
    <div class="input-bulk01">
      <img src="../img/phone.png"/>
      <span>+86</span>
      <input type="text"  placeholder="输入手机号手机"   v-model="userInfo.rephone" class="input-bulk-i"/>
    </div>
      <div class="input-bulk01">
        <img src="../img/lock.png"/>
        <input type="password"  placeholder="设置登录密码，不少于6位"  v-model="userInfo.repassword" class="input-bulk-i"/>
      </div>
    <van-button type="primary" @click="register" class="button">下一步</van-button>
  </div>
</div>
</template>

<script>
// import { Toast } from 'vant';

export default {
  name: 'register',
  data() {
    return {
      userInfo: {
        rephone: '',
        repassword: '',
      },
    };
  },
  methods: {
    Return() {
      this.$router.push({ name: 'login' });
    },
    register() {
      if (this.userInfo.rephone.length !== 11) {
        this.$toast('请输入正确的手机号');
        return;
      }
      if (this.userInfo.repassword.length < 6) {
        this.$toast('登录密码不能少于6位');
        return;
      }
      this.$http.post('/api/cellphone/existence/check', { params: this.userInfo.rephone })
        .then((res) => {
          if (res.data.userInfo) {
            this.$toast('该手机号已注册');
          } else {
            this.$http.post('/api/captcha/sent', { phone: this.userInfo.rephone })
              .then((res) => {
                this.$router.push({ path: '/node', query: { tel: this.userInfo.rephone, pwd: this.userInfo.repassword } });
              });
          }
        })
        .catch((err) => {
          this.__proto__.auth = null;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
 .register-bulk{
   line-height: 120px;
   color: #fff;
   background-color:#c64b3e ;
 }
 .register-bulk img{
   width:42px ;
   height: 70px;
   margin-left: 65px;
   vertical-align: middle;
 }
 .input-bulk-h{
   display: inline-block;
   width: 33.33vw;
   margin-left: 300px;
   font-size: 54px;
   text-align: center;
 }
  .input-bulk{
    width: 100vw;
    margin-top: 37px;
   line-height: 140px;
  }

  .input-bulk-i{
    width: 60vw;
    font-size:59px;
    height: 130px;
    border: none;
    color: #bcbdbe;
    outline: none;
  }
  .input-bulk01{
    width: 90vw;
    margin: 0px auto;
    height: 140px;
    line-height: 140px;
    border-bottom: 1px #e2e2e3 solid;
  }
 .input-bulk01 img{
   width: 41px;
   height: 59px;
   vertical-align: middle;
 }
  .button{
    display: block;
    width: 90vw;
    height: 119px;
    margin: 92px auto ;
    background-color:#e15949 ;
    border: unset;
    font-size: 48px;
    border-radius: 55px;
  }
</style>

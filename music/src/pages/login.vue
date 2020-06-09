<template>
  <div >
    <div class="register-bulk">
      <img src="../img/cancel.png" @click="Return"/>
      <span class="input-bulk-h">账号登录</span>
    </div>
    <div class="input-bulk">
      <div class="input-bulk01">
        <img src="../img/phone.png"/>
        <input type="text"  placeholder="手机"  autocomplete="off" v-model="userInfo.phone" class="input-bulk-i"/>
      </div>
      <div class="input-bulk01">
        <img src="../img/lock.png"/>
        <input type="password" placeholder="密码" autocomplete="off" v-model="userInfo.password" class="input-bulk-i"/>
      </div>
      <van-button type="primary" @click="login" class="button">登录</van-button>
      <div @click="register" class="button01" >重设密码</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      userInfo: {
        phone: '',
        password: '',
      },
    };
  },
  methods: {
    Return() {
      this.$router.push({ path: '/recommend' });
    },
    login() {
      this.$http.get('/api/login/cellphone', { params: this.userInfo })
        .then((res) => {
          this.$storage.set('user', res.data);
          this.$storage.get(this.$storage.get('user'));
          console.log(this.$storage.get('user'));
          this.$router.push({ path: '/account' });
        })
        .catch((err) => {
          this.__proto__.auth = null;
          console.log(err);
        });
    },
    register() {
      this.$router.push({ path: '/register' });
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
  .button01{
    width: 180px;
    font-size: 40px;
    line-height: 73px;
    margin: 63px auto;
    text-align: center;
    color: #969798;
    border-bottom: 2px solid #969798;
  }
</style>

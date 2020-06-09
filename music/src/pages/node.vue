<template>
    <div class="node">
      <div class="top">手机号验证</div>
      <div class="Return" @click="Return"></div>
      <div class="zhong">
        <p class="zhong_home">你的手机号： +86
          <span>{{tlenum}}</span>
        </p>
        <p class="zhong_text">你会收到一条带有验证码的短信,请输入验证码</p>

        <div class="zhong_inp">
          <input type="text" class="input" v-for="(key,item) in inputarr" :key="key" ref="inp" maxlength="1" @click="add">

        </div>
        <div class="count">{{timer}}s</div>
      </div>
      <van-number-keyboard
        v-model="valueNum"
        :show="show"
        extra-key="."
        close-button-text="完成"
        @blur="show=false"
        @input="fous"
        @delete="onDelete"
      ></van-number-keyboard>

    </div>
</template>

<script>
export default {
  name: 'node',
  data() {
    return {
      inputarr: [1, 2, 3, 4],
      value: '',
      valueNum: '',
      i: 0,
      j: 3,
      picFocusStatus: false,
      show: false,
      valuearr: [],
      timer: 60,
      clock: '',
    };
  },
  methods: {
    Return() {
      this.$router.push({ name: 'login' });
    },
    add() {
      this.show = true;
    },
    fous(values) {
      if (this.valuearr.length > 3) {
        return;
      }
      this.valuearr.push(values);
      console.log(this.valuearr);
      for (let i = 0; i < 4; i++) {
        if (this.valuearr[i] === undefined) {
          this.$refs.inp[i].value = '';
        } else {
          this.$refs.inp[i].value = this.valuearr[i];
        }
      }
      if (this.$refs.inp[3].value.length <= 0) {
        return;
      }
      const yam = this.valuearr.join('');
      this.$http.get(`/api/captcha/verify?phone=${this.$route.query.tel}&captcha=${yam}`)
        .then((res) => {
          this.$http.get(`http://localhost:3000/register/cellphone?phone=${this.$route.query.tel.trim()}&password=${this.$route.query.pwd.trim()}&captcha=${yam.trim()}&nickname=leiqianwen`)
            .then((res) => {
              console.log(res);
              this.$toast('注册成功');
              this.$router.push({ path: '/login' });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
    onDelete() {
      this.valuearr.splice(this.valuearr.length - 1, 1);
      console.log(this.valuearr);
      for (let i = 0; i < 4; i++) {
        if (this.valuearr[i] === undefined) {
          this.$refs.inp[i].value = '';
        } else {
          this.$refs.inp[i].value = this.valuearr[i];
        }
      }
    },
    djs() {
      this.clock = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          clearInterval(this.clock);
        }
      }, 1000);
    },
  },
  computed: {
    tlenum() {
      return this.$route.query.tel.replace(this.$route.query.tel.substring(3, 7), '****');
    },
  },
  mounted() {
    this.$refs.inp[0].focus();
    this.djs();
  },
};
</script>

<style scoped>
  .node{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .top{
    width: 100vw;
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 53px;
    color: #fffdef;
    background: #C64B3D url("../img/cancel.png") no-repeat 66px 34px;
    background-size: 40px 68px;
  }
  .zhong{
    width: 100vw;
    height: 240px;
  }
  .zhong_home{
    width: 100vw;
    height: 42px;
    font-size: 42px;
    text-indent: 118px;
    margin-top: 25px;
    color: #AEAEAF;
  }
  .zhong_text{
    width: 100vw;
    height: 42px;
    font-size: 40px;
    text-indent: 118px;
    color: #AEAEAF;
  }
  .zhong_inp{
    width: 90vw;
    margin: 0 auto;
    height: 154px;
  }
  .input{
    width: 184px;
    height: 150px;
    border: none;
    margin-left: 60px;
    border-bottom: 2px solid #ccc;
  }
  .count{
    width: 72vw;
    margin: 68px auto;
    text-align: right;
    height: 36px;
    font-size: 35px;
    color: #969798;
  }
  .Return{
    width: 25px;
    height: 30px;
    position: absolute;
    top: 10px;
    left: 18px;
  }
  input{
    font-size: 100px;
    font-weight: bold;
    text-align: center;
  }
</style>

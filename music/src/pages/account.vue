<template>
  <div class="account-page">
    <div class="account-top">
      <span class="account-top_item"></span>
      <span class="account-top_item account-top_center">账号</span>
      <span class="account-top_item">
          <img src="../icon02/menu.png" class="account-top_img" alt="">
      </span>
    </div>
    <div class="main">
      <div class="main-info">
        <div class="head-portrait">
          <!--          头像-->
          <img class="head-portrait_img float" :src="img">
          <!--          昵称-->
          <div class="nickname float">
            <div class="nickname-word">{{nickname}}</div>
            <div class="lv">
              <img src="../icon1/lv.png" class="lv-icon" alt="">
              {{grade}}
            </div>
          </div>
          <!--          签到-->
          <div class="signIn float">
            <img src="../icon1/qiandao.png" class="signIn_icon" alt="">
            <span class="signIn_word">签到</span>
          </div>
        </div>
        <!--        动态、关注、粉丝、我的资料-->
        <div class="allDynamics">
          <div class="allDynamics_item">
            <div class="allDynamics_word count_item">动态</div>
            <div class="allDynamics_count count_item">{{dynamic}}</div>
          </div>
          <div class="allDynamics_item">
            <div class="allDynamics_word count_item">关注</div>
            <div class="allDynamics_count count_item">{{follow}}</div>
          </div>
          <div class="allDynamics_item">
            <div class="allDynamics_word count_item">粉丝</div>
            <div class="allDynamics_count count_item">{{fans}}</div>
          </div>
          <div class="allDynamics_item">
            <div class="allDynamics_word count_item">
              <img src="../icon1/pencel.png" class="allDynamics-img" alt="">
            </div>
            <div class="allDynamics_count count_last count_item">我的资料</div>
          </div>
        </div>
      </div>
      <!--      我的消息-->
      <div class="myNews">
        <div class="icon items">
          <img src="../icon1/email.png" class="icon-img" alt="">
        </div>
        <div class="title items" @click="mynode">
          我的消息
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
      </div>
      <!--      会员中心、商城、在线听歌免流量-->
      <div class="vipCenter">
        <!--        会员中心-->
        <div class="icon items">
          <img src="../icon1/VIP.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          会员中心
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--        商城-->
        <div class="icon items">
          <img src="../icon1/mark.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          商城
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--        在线听歌免流量-->
        <div class="icon items">
          <img src="../icon1/online.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          在线听歌免流量
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
      </div>
      <!--      剩下全部-->
      <div class="all">
        <!--        设置-->
        <div class="icon items">
          <img src="../icon1/set.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          设置
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--        扫一扫-->
        <div class="icon items">
          <img src="../icon1/scan.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          扫一扫
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--        个性换肤-->
        <div class="icon items">
          <img src="../icon1/idt.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          个性换肤
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--        夜间模式-->
        <div class="icon items">
          <img src="../icon1/night.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          夜间模式
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <!--<img src="../assets/icon1/next.png" class="icon02-img2" alt="">-->
            <van-switch
              v-model="checked"
              size="24px"
              active-color="#666"
              inactive-color="#fff"
              class="swit"
            />
          </div>
        </div>
        <!--        定时关闭-->
        <div class="icon items">
          <img src="../icon1/timing.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          定时关闭
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--          音乐闹钟-->
        <div class="icon items">
          <img src="../icon1/slock.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          音乐闹钟
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--          驾驶模式-->
        <div class="icon items">
          <img src="../icon1/car.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          驾驶模式
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--          亲子频道-->
        <div class="icon items">
          <img src="../icon1/boy.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          亲子频道
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--          小冰电台-->
        <div class="icon items">
          <img src="../icon1/icecream.png" class="icon-img ice-img" alt="">
        </div>
        <div class="title items">
          小冰电台
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--          优惠券-->
        <div class="icon items">
          <img src="../icon1/dcoupon.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          优惠券
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
      </div>
      <div class="footer-join">
        <!--        加入网易音乐人-->
        <div class="icon items">
          <img src="../icon1/join.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          加入网易音乐人
          <div class="next items">
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--        分享网易云音乐-->
        <div class="icon items">
          <img src="../icon1/share.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          分享网易云音乐
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
        <!--        关于-->
        <div class="icon items">
          <img src="../icon1/about.png" class="icon-img" alt="">
        </div>
        <div class="title items">
          关于
          <div class="next items">
            <!--            <img src="./icon02/head.png" alt="">-->
            <img src="../icon1/next.png" class="icon-img2" alt="">
          </div>
        </div>
      </div>
      <!--        退出登录-->
      <div class="exit" @click="exit">退出登录</div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  name: 'account',
  data() {
    return {
      id: this.$storage.get('user').account.id,
      img: this.$storage.get('user').profile.avatarUrl,
      nickname: this.$storage.get('user').profile.nickname,
      grade: '',
      follow: '',
      fans: '',
      dynamic: '',
      checked: false,
    };
  },
  created() {
    this.$http.get(`/api/user/detail?uid=${this.id}`).then((res) => {
      // 等级
      this.grade = res.data.level;
      // 获取关注个数
      this.follow = res.data.profile.newFollows;
    });
    // 1.获取粉丝列表
    this.$http.get(`/api/user/event?uid=${this.id}&limit=1`).then((res) => {
      // 获取粉丝数
      this.fans = res.data.events.length;
      // eslint-disable-next-line no-unused-vars
    }).catch((err) => {});

    // 2.获取用户关注列表
    // this.$http.get(`/api/user/follows?uid=${this.id}`).then((res) => {
    //   // 获取关注个数
    //   this.follow = res.data.follow.length;
    //   // eslint-disable-next-line no-unused-vars
    // }).catch((err) => {
    //   console.dir(err);
    // });

    // 3.获取用户关注列表
    this.$http.get(`/api/user/event?uid=${this.id}`).then((res) => {
      // 获取关注个数
      this.dynamic = res.data.events.length;
      // eslint-disable-next-line no-unused-vars
    }).catch((err) => {});
  },
  methods: {
    exit() {
      Dialog.confirm({
        title: '温馨提示',
        message: '你真的忍心离开?',
      })
        .then(() => {
          this.$http.get('http://localhost:3000/logout').then(() => {
            this.$storage.remove('user');
            this.$router.push({ path: '/recommend' });
          });
        })
        .catch(() => {
          this.$router.push({ path: '/Account' });
        });
    },
    mynode() {
      this.$router.push({ path: '/myMessage' });
    },
  },
};
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .float{
    float: left;
  }
  .account-page{
    width: 1242px;
    height: 100vh;
    background-color: #EFEFF0;
  }
  .account-top{
    width: 1242px;
    height: 140px;
    background-color: #C64B3D;
    color: #fff;
    font-size: 0;
    text-align: center;
    line-height: 140px;
  }
  .account-top_item{
    width: 170px;
    height: inherit;
    display: inline-block;
    float: left;
  }
  .account-top_center{
    width: 900px;
    font-size: 53px;
    color: #fff;
  }
  .account-top_img{
    width: 70px;
    height: 70px;
    vertical-align: middle;
  }
  .main-info{
    width: 1242px;
    height: 435px;
    background-color: #fff;
  }
  .head-portrait{
    width: 1242px;
    height: 250px;
    border-bottom: 1px solid #EAEAEB;
  }
  .head-portrait_img{
    width: 183px;
    height: 183px;
    border-radius: 50%;
    margin-left: 48px;
    margin-top: 45px;
  }
  .nickname{
    width: 750px;
    display: inline-block;
    margin-top: 80px;
    margin-left: 32px;
  }
  .nickname-word{
    font-size: 50px;
  }
  .lv{
    width: 105px;
    height: 50px;
    border: 2px solid #C1C1C1;
    font-size: 23px;
    color: #969798;
    font-weight: 600;
    line-height: 50px;
    text-align: center;
    border-radius: 30px;
    margin-top: 30px;
  }
  .lv-icon{
    width: 43px;
    height: 24px;
  }
  .signIn{
    width: 190px;
    height: 80px;
    border:4px solid #C2463A;
    display: inline-block;
    border-radius: 40px;
    position: relative;
    font-size: 35px;
    color: #C2463A;
    line-height: 80px;
    text-align: center;
    margin-top: 100px;
  }
  .signIn_icon{
    width: 37px;
    height: 38px;
    vertical-align: middle;
  }
  .signIn_word{
    display: inline-block;
  }
  .allDynamics{
    width: 1242px;
    height: 100px;
    display: flex;
    margin-top: 33px;
  }
  .allDynamics_item{
    flex: 1;
    text-align: center;
    border-right: 1px solid #E5E5E6;
  }
  .count_item{
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .allDynamics_word{
    font-size: 35px;
    color: #9A9B9C;
  }
  .allDynamics_count{
    font-size: 30px;
    color: #000;
  }
  .allDynamics-img{
    width: 45px;
    height: 45px;
  }
  .count_last{
    color: #9A9B9C;
    border-right: none;
  }
  .main{
    width: 1242px;
    position: absolute;
    bottom: 150px;
    top: 140px;
    overflow: auto;
  }
  .myNews{
    width: 1242px;
    height: 136px;
    background-color: #fff;
    margin: 30px auto 30px;
    font-size: 0;
  }
  .items{
    display: inline-block;
    height: 136px;
    line-height: 136px;
  }
  .icon{
    width: 136px;
    text-align: center;
    float: left;
  }
  .icon-img{
    width: 57px;
    height: 52px;
    vertical-align: middle;
  }
  .ice-img{
    height: 75px;
  }
  .title{
    width: 1105px;
    font-size: 46px;
    float: left;
    border-bottom: 1px solid #EAEAEB;
  }
  .next{
    width: 219px;
    text-align: right;
    float: right;
    margin-right: 30px;
  }
  .icon-img2{
    width: 27px;
    height: 42px;
    vertical-align: middle;
  }
  .vipCenter{
    width: 1242px;
    height: 406px;
    background-color: #fff;
  }
  .all{
    width: 1242px;
    height: 1400px;
    background-color: #fff;
    margin-top: 30px;
  }
  .footer-join{
    width: 1242px;
    height: 406px;
    background-color: #fff;
    margin: 30px auto 30px;
  }
  .exit{
    width: 1242px;
    height: 140px;
    background-color: #fff;
    margin-bottom: 30px;
    color: #C2463A;
    font-size: 47px;
    text-align: center;
    line-height: 140px;
  }
  .swit{
    margin-top: 30px;
  }
</style>

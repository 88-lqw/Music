<template>
  <div class="my-box">
    <div class="my-top">
      <span class="leftImg iconfont icon-yun1"></span>
      <span class="title">我的音乐</span>
      <span class="rightImg"><img src="" alt=""></span>
    </div>
    <ul class="my-list">
      <li v-for="(key,item) in text">
        <img :src="img[item]" alt="" class="icon">
        <span class="text">{{text[item]}}
        <span class="number">{{number[item]}}</span>
        <img src="" alt="" class="right">
        </span>
      </li>
    </ul>
    <div class="create">
      <img src="" alt="">
      <span>我创建的歌单（5）</span>
      <img src="" alt="">
    </div>
    <ul class="music_list">
      <li v-for="(key,item) in getplaylist" :key="item">
        <img :src="getplaylist[item].coverImgUrl" alt="">
        <div class="music_list-text">
          <span class="music_list-text-word">{{getplaylist[item].name}}</span>
          <span>{{getplaylist[item].trackCount}}首</span>
        </div>
        <div class="cardiac"><img src="../img/heart.png" alt=""><span>心动模式</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import '../font_debtbfvurb/iconfont.css';

export default {
  name: 'my',
  data() {
    return {
      text: ['本地音乐', '最近播放', '我的电台', '我的收藏', 'Sati空间'],
      img: [require('../img/misicIcon02.png'), require('../img/precent.png'),
        require('../img/myStation.png'), require('../img/myCollection.png'),
        require('../img/moon.png')],
      number: ['0', '108', '3', '2', ''],
    };
  },
  computed: {
    ...mapState(['getplaylist']),
  },
  created() {
    this.$api.getPlaylistone({ uid: this.$storage.get('user').account.id });
  },
};
</script>

<style scoped>
  .my-box{
    width: 100vw;
    font-size: 0;
  }
  .my-top{
    width: 100vw;
    height: 120px;
    background: #c84c3e;
    font-size: 0;
  }
  .leftImg{
    display: inline-block;
    font-size:60px ;
    color: #ffffff;
    margin-top: 30px;
    margin-left: 45px;
    vertical-align: middle;
  }
  .rightImg{
    display: inline-block;
    vertical-align: middle;
  }
  .leftImg>img{
    width: 75px;
    vertical-align: middle;
    margin-left: 45px;
    margin-top: 95px;
  }
  .rightImg>img{
    width: 70px;
    vertical-align: middle;
    margin-top: 95px;
    margin-left: 400px;
  }
  .title{
    font-size: 55px;
    display: inline-block;
    color: white;
    vertical-align: middle;
    margin-left: 390px;
    margin-top: 28px;
  }
  .my-list{
    list-style: none;
    font-size: 0;
  }
  .my-list>list{
    width: 100vw;
    height: 165px;
  }
  .icon{
    width: 80px;
    height: 75px;
    margin-left: 60px;
    vertical-align: middle;
  }
  .text{
    width: 1032px;
    height: 165px;
    font-size: 50px;
    line-height: 165px;
    border-bottom: 1px solid #e2e2e3;
    display: inline-block;
    vertical-align: middle;
    margin-left: 70px;
    position: relative;
  }
  .number{
    font-size: 33px;
    width: 70px;
    text-align: right;
    color: #969798;
    margin-left: 670px;
    display: inline-block;
  }
  .right{
    height: 45px;
    vertical-align: middle;
    position: absolute;
    right: 20px;
    top:60px;
  }
  .create{
    width: 100vw;
    height: 90px;
    background: #efeff0;
    line-height: 90px;
  }
  .create>img:nth-child(1){
    width: 35px;
    vertical-align: middle;
    margin-left: 30px;
  }
  .create>span{
    font-size: 35px;
    color: #5f5f60;
    vertical-align: middle;
    display: inline-block;
    margin-left: 35px;
  }
  .create>img:nth-child(3){
    width: 55px;
    vertical-align: middle;
    margin-left: 750px;
  }
  .music_list{
    list-style: none;
    font-size: 0;
  }
  .music_list>li{
    display: inline-block;
    height: 180px;
    margin-left: 18px;
    position: relative;
  }
  .music_list>li>img{
    width: 163px;
    height: 163px;
    border-radius: 10px;
    margin-top: 10px;
    float: left;
  }
  .music_list-text{
    width: 1030px;
    height: 180px;
    border-bottom: 1px solid #e2e2e3;
    font-size: 0;
    display: inline-block;
    margin-left: 28px;
  }
  .music_list-text>span:nth-child(1){
    width:650px;
    font-size: 50px;
    height: 60px;
    display: block;
    margin-top: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .music_list-text>span:nth-child(2){
    font-size: 38px;
    color: #7d7d7e;
    display: block;
    margin-top: 20px;
  }
  .cardiac{
    width: 275px;
    height: 80px;
    border: 1px solid #c2463a;
    border-radius: 35px;
    position: absolute;
    right: 30px;
    top: 53px;
  }
  .cardiac>img{
    width: 60px;
    margin: 22px 10px 0 30px;
    vertical-align: middle;
  }
  .cardiac>span{
    font-size: 38px;
    color: #c2463a;
    vertical-align: middle;
    position: relative;
    top: 10px;
  }
</style>

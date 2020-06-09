<template>
  <div class="box">
    <div class="box-top">
        <span class="box-top_item">
          <img src="../img/cancel.png" alt="" class="box-top_img1" @click="mainReturn">
        </span>
      <span class="box-top_item box-top_center">歌单</span>
      <span class="box-top_item">
          <img src="../icon02/menu.png" class="box-top_img" alt="" @click="songClick">
        </span>
    </div>
    <div class="main">
      <div class="Boutiquesong">
        <div class="Boutiquesong_bj">
          <img :src="coverImgUrl" alt="">
        </div>
        <img :src="coverImgUrl" alt="" class="Boutiquesong_img">
        <span class="Boutiquesong_box">
          <span class="Boutiquesong_box_item">
            <img src="../img/weChat.png" alt="" class="Boutiquesong_box_img1">
            <span class="Boutiquesong_box_txt">精品歌单</span>
            <img src="../icon02/xiayige2.png" alt="" class="Boutiquesong_box_img2">
          </span>
          <span class="Boutiquesong_box_item box_item_1">{{contitName}}</span>
          <span class="Boutiquesong_box_item box_item_2">{{copywriter}}</span>
        </span>
      </div>
      <div class="whole">
        <span class="whole_left">
          <span class="whole_left_text">全部歌单</span>
          <img src="../icon02/xiayige2.png" alt="" class="whole_left_xiayige">
        </span>
        <span class="whole_right">
            华语
          <i class="whole_right_x"></i>
            流行
          <i class="whole_right_x"></i>
            说唱
        </span>
      </div>
      <span class="box_img-text"  v-for="(item, key) in songArr" :key="key" @click="songClick(item)">
          <img  :src="item.coverImgUrl"  alt="" class="img">
          <div class="text">{{item.name}}</div>
          <div class="dw-text">{{item.creator.nickname}}</div>
          <div class="playCount">{{(item.playCount)}}人</div>
      </span>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'songmenu',
  data() {
    return {
      contitName: '',
      copywriter: '',
      coverImgUrl: '',
    };
  },
  computed: {
    ...mapState(['songArr']),
  },
  methods: {
    mainReturn() {
      this.$router.push({ path: '/' });
    },
    ...mapMutations(['songClick']),
    // songClick(item) {
    //   this.$router.push({ path: '/songlist', query: { id: item.id } });
    // },
  },
  created() {
    this.$http.get('/api/top/playlist/highquality').then((res) => {
      this.contitName = res.data.playlists[2].name;
      this.copywriter = res.data.playlists[2].copywriter;
      this.coverImgUrl = res.data.playlists[2].coverImgUrl;
    });
    this.$api.getPlaylist();
  },
};
</script>

<style scoped>
  .box{
    width: 100vw;
    height: 100vh;
  }
  .box-top{
    width: 1242px;
    height: 140px;
    background-color: #C64B3D;
    color: #fff;
    font-size: 0;
    text-align: center;
    line-height: 140px;
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .box-top_item{
    width: 170px;
    height: inherit;
    display: inline-block;
    overflow: hidden;
  }
  .box-top_center{
    width: 900px;
    font-size: 53px;
    color: #fff;
  }
  .box-top_img1{
    width: 50px;
    height: 70px;
    vertical-align: middle;
  }
  .box-top_img{
    width: 70px;
    height: 70px;
    vertical-align: middle;
  }
  .main{
    width: 100vw;
    overflow: hidden;
    position: absolute;
    top: 140px;
  }
  .Boutiquesong{
    width: 100vw;
    height: 500px;
    position: relative;
    padding-top: 140px;
    box-sizing: border-box;
    font-size: 0;
    overflow: hidden;
  }
  .Boutiquesong_bj{
    width: 120vw;
    height: 600px;
    position: absolute;
    top: -20px;
    filter: blur(10px);
    z-index:-1;
  }
  .Boutiquesong_img{
    display: inline-block;
    width: 300px;
    height: 300px;
    border-radius: 20px;
    margin:0 30px;
  }
  .Boutiquesong_box{
    overflow: hidden;
    display: inline-block;
    width: 800px;
    height: 300px;
  }
  .Boutiquesong_box_item{
    display: inline-block;
    width: 100vw;
    font-size: 60px;
    color: #fff;
  }
  .Boutiquesong_box_txt{
    line-height:2;
  }
  .Boutiquesong_box_img1{
    width: 80px;
    vertical-align: middle;
  }
  .Boutiquesong_box_img2{
    width: 32px;
    height: 60px;
    vertical-align: middle;
  }
  .box_item_1{
    font-size: 55px;
    margin-top: 20px;
  }
  .box_item_2{
    margin-top: 10px;
    font-size: 40px;
    color: #A6A19D;
  }
  .whole{
    width: 100vw;
    margin:50px 0;
    font-size:0;
  }
  .whole_left{
    display: inline-block;
    width: 326px;
    height: 88px;
    overflow: hidden;
    margin-left: 50px;
    border: 2px solid #C9C9CA;
    border-radius: 88px;
    position: relative;
  }
  .whole_left_text{
    display: inline-block;
    font-size: 44px;
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 40px;
    color: black;
  }
  .whole_left_xiayige{
    width: 20px;
    height: 50px;
    position: absolute;
    top: 20px;
    right: 50px;
  }
  .whole_right{
    margin-left: 50px;
    overflow: hidden;
    width: 60%;
    height: 100px;
    line-height: 100px;
    display: inline-block;
    font-size: 45px;
    text-align: right;
  }
  .whole_right_x{
    position: relative;
    top: 9px;
    display: inline-block;
    width: 2px;
    height: 50px;
    background: black;
  }
  .box_img-text{
    display: inline-block;
    width: 570px;
    height: 750px;
    overflow: hidden;
    margin: 20px 7px;
    position: relative;
  }
  .img{
    width: 570px;
    border-radius: 20px;
  }
  .text{
    width: 570px;
    height: 150px;
    font-size: 45px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .dw-text{
    position: absolute;
    bottom: 180px;
    left: 30px;
    color: #fff;
  }
  .playCount{
    position: absolute;
    top: 10px;
    right: 30px;
    color: #fff;
  }
</style>

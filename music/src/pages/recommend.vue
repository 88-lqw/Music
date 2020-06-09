<template>
  <div>
     <div class="recommend">推荐歌单<img src="../icon02/xiayige.png" class="icon"/></div>
      <div class="musicmenu">
        <div class="musicmenu-img"  v-for="(item,key1) in musicmenu" :key="key1" @click="songClick(item)">
          <img :src="item.picUrl"/>
          <span >{{item.name}}</span>
        </div>
      </div>
        <div class="program"><img src="../icon02/icons.png" class="pic"/>&nbsp;看看 <img src="../icon02/xiayige.png" class="icon"/></div>
        <div class="program-mv">
          <div class="program-img"  v-for="(item,key) in artist" :key="key">
            <img :src="item.img1v1Url"/>
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="recommend">最新音乐 <img src="../icon02/xiayige.png" class="icon"/></div>
        <div class="musicmenu-img"  v-for="(item,key) in album" :key="key">
          <img :src="item.picUrl"/>
          <span >{{item.name}}</span>
        </div>
        <div class="recommend">主播电台 <img src="../icon02/xiayige.png" class="icon"/></div>
        <div class="musicmenu-img"  v-for="(item,key) in program" :key="key.picUrl">
          <img :src="item.picUrl"/>
          <span >{{item.name}}</span>
        </div>
        <spin></spin>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Spin from '../components/spin';


export default {
  name: 'recommend',
  data() {
    return {
      musicmenu: [],
      artist: [],
      album: [],
      program: [],
    };
  },
  methods: {
    ...mapMutations(['songClick']),
  },
  created() {
    this.$http.get('http://localhost:3000/personalized?limit=6')
      .then((res) => {
        console.log(res);
        this.musicmenu = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/top/artists?offset=0&limit=3\n')
      .then((res) => {
        console.log(res);
        this.artist = res.data.artists;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/top/album?offset=0&limit=6')
      .then((res) => {
        console.log(res);
        this.album = res.data.albums;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/personalized/djprogram?limit=6')
      .then((res) => {
        console.log(res);
        this.program = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    Spin,
  },
};
</script>

<style scoped>
  .recommend{
    width: 100vw;
    height: 109px;
    font-size: 48px;
    box-sizing: border-box;
    padding: 60px 22px 0;
  }
  .pic{
    width: 60px;
    height: 60px;
    vertical-align: top;
  }
  .icon{
    height: 42px;
    width: 26px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .musicmenu{
    height: 1132px;
    width: 100vw;
    font-size: 0;
    overflow: hidden;
  }
  .musicmenu-img{
    display: inline-block;
    margin-top: 45px;
    height: 500px;
    width: 33.3vw;
    text-align: center;
  }
  .musicmenu-img img{
    display: inline-block;
    border-radius: 20px;
    width: 397px;
    height: 397px;
  }
  .musicmenu-img span{
    font-size: 40px;
    height: 90px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .program{
    box-sizing: border-box;
    padding: 0 94px ;
    margin-top: 110px;
    font-size: 52px;
  }
  .program-mv{
    height: 653px;
    font-size: 0;
  }
  .program-img{
    display: inline-block;
    margin-top: 47px;
    height: 653px;
    width: 33.3vw;
    text-align: center;
  }
  .program-img img{
    width:397px ;
    height: 527px;
  }
  .program-img span{
    font-size: 39px;
  }
  .vipcenter{
    height: 995px;
    background-color: #cacaca;
    width: 100vw;
  }

</style>

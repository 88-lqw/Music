<template>
  <div class="playMusic">
    <img :src="Musicimg" class="playMusic-img"/>
    <div class="playMusic-bulk">
      <img src="../img/cancel.png" @click="Return"/>
      <div class="playMusic-bulk01">
      <span class="playMusic-bulk01-name">{{Musicname}}</span>
        <span class=" playMusic-bulk01-name01">{{songer}}</span>
      </div>
     <span class="playMusic-bulk-img iconfont icon-fenxiang"></span>
    </div>
    <div class="playMusic-middle" v-show="sure" >
      <img :src="Musicimg" class="playMusic-middle-img" @click="sure=!sure"/>
    </div>
    <div class="playMusic-middle01" v-show="!sure"  @click="sure=!sure">
      <div class="lyric-container" ref="scroll" style="width: 80vw;height: 70vh; margin: auto;overflow: hidden" >
          <ul class="warp">
            <li v-for="(item,key) in lyricArr"
                :key="key"
                :class ="{active: item.cls}"
                style=" line-height: 30px">
                {{item.txt}}
              </li>
          </ul>
      </div>
    </div>
    <audio autoplay ref="off" class="player-audio" :src="Musicurl">你浏览器太垃圾了!</audio>
    <div class="middle-in">
      <div class="playMusic-icon">
         <span class="playMusic-icon-bulk iconfont icon-xihuan"></span>
        <span class="playMusic-icon-bulk iconfont icon-Cell-Download"></span>
        <span class="playMusic-icon-bulk iconfont icon-dianshi-touping"></span>
        <span class="playMusic-icon-bulk iconfont icon-pinglun"></span>
        <span class="playMusic-icon-bulk iconfont icon-gengduo"></span>
      </div>
      <div class="progress-bd">
        <span class="player-progress__item waste-time" v-html="wasteTime"></span>
        <van-slider class=" player-progress__item progress-bar" v-model="value" @change="Change"  active-color="#ffffff" ref="AllWidth">
          <div class="progress-bar_active" :style="{width:styleWidth}" slot="button"></div>
          <div class="progress-point" :style="{left:styleWidth}" slot="button" ref="point"></div>
        </van-slider>
        <span class="player-progress__item total-time" v-html="allTime"></span>
      </div>
    </div>
    <!--下部-->
    <div class="footer">
      <span class="footer-bulk iconfont icon-xunhuan"></span>

      <span class="footer-bulk iconfont icon-shangyiqu"  @click="uppalyid"></span>

      <span class="footer-bulk footer-pause">
                      <span v-if="pause" @click.stop="pause=!pause" class="fa  fa-play-circle controls-icon"></span>
                      <span v-else @click.stop="pause=!pause" class="fa  fa-pause-circle-o controls-icon"></span>
                 </span>
      <span class="footer-bulk iconfont icon-xiayiqu"  @click="palyid"></span>
      <span class="footer-bulk iconfont icon-pajian_gequliebiao_" ></span>
    </div>
    <!--<div v-for="(item,key) in songArr" :key="key">-->
      <!--{{item.id}}-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Lyric from '../../node_modules/lyric-parser/dist/lyric';
import { Slider, Toast } from '../../node_modules/vant';
import '../font_n9auiyer55o/iconfont.css';
import '../font-awesome-4.7.0/css/font-awesome.css';
import BScroll from '../../node_modules/better-scroll';
import { store } from '../store';


export default {
  name: 'play',
  data() {
    return {
      Musicimg: '',
      songWord: '',
      Musicurl: '',
      sure: true,
      pause: false,
      wasteTime: '',
      allTime: '',
      styleWidth: '',
      Musicname: '',
      songer: '',
      lyricArr: [],
      scroller: null,
      value: 50,
      songsArr: [],
      playstart: true,
    };
  },
  computed: {
    ...mapState(['songs']),
    ...mapState(['id']),
    ...mapState(['playid']),
    ...mapState(['playkey']),
    ...mapState(['playid']),
  },
  components: {
    Slider, Toast,
  },
  // computed: {
  //   ...mapState(['songArr']),
  // },
  methods: {
    Change(value) {
      this.$refs.off.currentTime = ~~((value / 100) * (this.$refs.off.duration));
    },
    Return() {
      this.$router.go(-1);
      this.$song.stop();
    },
    formatTime(time) {
      const ontime = ~~(time / 60);
      const uptime = ~~(time % 60);
      if (ontime < 10) {
        if (uptime < 10) {
          return `0${ontime}:0${uptime}`;
        } return `0${ontime}:${uptime}`;
      } else if (uptime < 10) {
        return `${ontime}:0${uptime}`;
      }
      return `${ontime}:${uptime}`;
    },
    // 下一曲
    palyid() {
      this.$song.stop();
      store.state.playkey++;
      store.state.playid = store.state.songs[store.state.playkey].id;
      this.repeat(store.state.playid);
    },
    // 上一曲
    uppalyid() {
      store.state.playkey--;
      store.state.playid = store.state.songs[store.state.playkey].id;
      this.repeat(store.state.playid);
    },
    // start() {
    //   this.$song.play();
    //   this.$refs.off.play();
    //   this.pause = !this.pause;
    // },
    // paused() {
    //   this.$song.stop();
    //   this.$refs.off.pause();
    //   this.pause = !this.pause;
    // },
  },
  created() {
    this.repeat = function repeat(id) {
      this.$http.get(`http://localhost:3000/lyric?id=${id}`)
        .then((res) => {
          this.songWord = res.data.lrc.lyric;
          const song = new Lyric(this.songWord, fn1);
          // this.songStr = res.data.lrc.lyric.replace(/\n/g, '<br>').replace(/[\[\]\d]|(?=.):|\./g, '');
          this.$song = song;
          const proto = this;
          if (this.$refs.off.paused) {
            this.$song.play();
          } else {
            this.$song.togglePlay();
          }
          proto.lyricArr = song.lines.map((item) => {
            item.cls = false;
            return item;
          });

          function fn1(obj) {
            proto.songStr = obj.txt;
            console.log(obj.lineNum);
            proto.lyricArr[obj.lineNum - 1 < 0 ? 0 : obj.lineNum - 1].cls = false;
            proto.lyricArr[obj.lineNum].cls = true;
            if (obj.lineNum > 6) {
              proto.scroller.scrollTo(0, -(obj.lineNum - 5) * 30, 500);
            }
          }

          proto.wasteTime = proto.formatTime(this.currentTime);
          this.$refs.off.ontimeupdate = function () {
            if (proto.wasteTime !== this.currentTime) {
              proto.wasteTime = proto.formatTime(this.currentTime);
              proto.styleWidth = `${this.currentTime * 100 / this.duration}%`;
              proto.value = ~~(this.currentTime * 100 / this.duration);
            }
            proto.allTime = proto.formatTime(this.duration);
          };
        })
        .catch((err) => {
          console.log(err);
        });
      this.$http.get(`http://localhost:3000/song/detail?ids=${id}`)
        .then((res) => {
          console.log('---');
          console.log(res);
          console.log('---');
          this.Musicimg = res.data.songs[0].al.picUrl;
          this.Musicname = res.data.songs[0].name;
          this.songer = res.data.songs[0].ar[0].name;
          console.log(this.songer);
        })
        .catch((err) => {
          console.log(err);
        });
      // 获取歌曲的id
      this.$http.get(`http://localhost:3000/song/url?id=${id}`)
        .then((res) => {
          console.log(res);
          this.Musicurl = res.data.data[0].url;
          // this.$refs.off.onload = () => {
          //   console.log(123);
          //   this.$refs.off.play();
          //   this.$song.togglePlay();
          // };
        })
        .catch((err) => {
          console.log(err);
          //
        });

      this.$watch('pause', () => {
        if (this.pause === true) {
          this.$refs.off.pause();
          this.$song.togglePlay();
        } else {
          this.$refs.off.play();
          this.$song.togglePlay();
        }

        // this.$watch('pause', () => {
        //   if (this.pause === true) {
        //     this.$refs.off.pause(); this.$song.togglePlay();
        //   } else {
        //     this.$refs.off.play();
        //     this.$song.togglePlay();
        //   }
      });
      // this.$api.getPlaylist();
      this.$api.getSonglist();
    }, this.repeat(store.state.playid);
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.scroll, {});
  },
};
</script>

<style scoped>

  .playMusic{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .playMusic-img{
    width: 200vw;
    -webkit-filter: blur(15vw);
    position: absolute;
    object-fit: cover;
    top: -50%;
    left: -50%;
    transform: translate(0,25%);
    z-index: -1;
  }
  .playMusic-bulk{
    height: 145px;
  }
  .playMusic-bulk img{
    width:42px ;
    height: 70px;
    margin-left: 65px;
  }
  .playMusic-bulk01{
    height: 145px;
    line-height: 120px;
    width: 826px;
    display: inline-block;
    color: #fffdef;
    text-align: center;
    margin-left: 104px;
  }
  .playMusic-bulk01-name{
    display: block;
    height: 45px;
    font-size: 45px;
    line-height: unset;
  }
  .playMusic-bulk01-name01{
    display: block;
    height: 35px;
    font-size: 35px;
    line-height: unset;
  }
  .playMusic-bulk-img{
    display: inline-block;
    height: 120px;
    font-size: 63px;
    color: #fff;
    vertical-align: middle;
  }
  .playMusic-middle{
    width: 721px;
    height: 721px;
    border-radius: 50%;
    overflow: hidden;
    margin:358px auto ;
  }
  .playMusic-middle-img{
    width: inherit;
    height: inherit;
    object-fit: cover;
  }

  .middle-in .progress-bd {
    font-size: 0px; }
   .middle-in .progress-bd .player-progress__item {
    display: inline-block;
    vertical-align: middle;
    width: 10%;
    font-size: 0.3rem;
    text-align: center; }
  .middle-in .progress-bd .progress-bar {
    width: 80%;
    height: 4px;
    background: #a07676;
    position: relative;
    border-radius: 1px; }
   .middle-in .progress-bd .progress-bar .progress-bar_active {
    display: inline-block;
    width: 3rem;
    height: inherit;
    position: absolute;
    left: 0;
    top: 2px; }
  .middle-in .progress-bd .progress-bar .progress-point {
    width: 50px;
    height: 50px;
    background: #b3d4fc;
    position: absolute;
    left: -15px;
    top: -25px;
    border-radius: 50%;
    z-index: 2; }
   .middle-in .progress-bd .progress-bar .progress-point::before {
    content: "";
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #a07676;
    position: absolute;
    left: 20px;
    top: 20px; }
  .playMusic-middle01{
    width: 100vw;
    height: 1437px;
    text-align: center;
    overflow: hidden;
  }
  .playMusic-icon{
    width: 90vw;
    margin: 0 auto;
    text-align: center;
    line-height: 250px;
    font-size: 0;
  }
  .playMusic-icon-bulk{
    display: inline-block;
    width: 18vw;
    font-size: 67px;
  }
  .footer{
    width: 100vw;
    line-height: 304px;
    font-size: 0px;
  }
  .footer-bulk{
    display: inline-block;
    width: 20%;
    text-align: center;
    font-size: 80px;
  }
  .footer-bulk .fa {
    font-size: 142px;
    vertical-align: middle;
  }
  .active{
    color: red;
  }
</style>

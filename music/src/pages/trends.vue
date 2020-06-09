<template>
    <div class="trends">
     <div class="trends-top">
       <span class="trends-top-icon iconfont icon-tianjiahaoyou"></span>
       <div class="trends-top-bulk">
         <span v-for="(item,key) in Trendstitle"
               :key="key"
               @click="toggle(key)"
               :style="`color:${(color===key? '#c2463a':'#fff')}`"
               class="trends-top-bulk01" >
           {{item}}
         </span>
         <span class="trends-top-bulk-b"
               :style="{left: currentKey01*(100/Trendstitle.length) + '%'}"></span>
       </div>
       <span class="trends-top-icon01 iconfont icon-youyinpin"></span>
       <div class="trends-top-mddile">
      <div class="trends-top-mddile-bulk">
        <span class="trends-top-mddile-bulk-icon iconfont icon-bianji"></span>
        <span class="trends-top-mddile-bulk-word"> 发动态</span>
      </div>
       <div class="trends-top-mddile-bulk">
         <span class="trends-top-mddile-bulk-icon iconfont icon-shipinbofangyingpian2"></span>
         <span class="trends-top-mddile-bulk-word"> 发布视频</span>
       </div>
       </div>
     </div>
      <div class="trends-mddile">我关注的他们<span class="iconfont icon-xiayige"></span></div>
      <div  class="trends-mddile01">
        <span class="trends-mddile01-bulk" v-for="(item,key) in follow" :key="key" :style="{width:100/follow.length + '%'}">
           <img :src="item.avatarUrl" class="trends-mddile01-img" @click="trendstoggle(item,key)"/>
           <span class="trends-mddile01-word">{{item.nickname}}</span>
        </span>
      </div>
      <div class="trends-mddile02-all" v-for="(item,key) in trendsnode01" :key="key">
        <div class="trends-mddile02"  @click="trendstoggle(item,key)">
         <img :src="events[key].user.avatarUrl" class="trends-mddile02-img"/>
          <div class="trends-mddile02-bulk">
            <span class="trends-mddile02-bulk-word">{{events[key].user.nickname}}</span>
            <span class="trends-mddile02-bulk-word01">发布视频:</span>
            <span  class="trends-mddile02-bulk-word02">10月28日</span>
          </div>
          <div class="trends-mddile02-bulk01">
            <span class="trends-mddile02-bulk01-word">{{item.msg}}</span>
            <div class="trends-mddile02-bulk01-music"
                 v-if="trendsnode01[key].song"
            >
              <audio  ref="off" class="player-audio" :src="songurl[key]">你浏览器太垃圾了!</audio>
              <img :src="trendsnode01[key].song.album.img80x80" class="trends-mddile02-bulk01-music-img"  @click="play(item,key)"/>
              <div class="trends-mddile02-bulk01-music-word">
                {{trendsnode01[key].song.name}}
                <div class="trends-mddile02-bulk01-music-word02">{{trendsnode01[key].song.album.artists[0].name}}</div>
              </div>
            </div>
            <div class="trends-mddile02-bulk01-video"
                 v-if="trendsnode01[key].video"
            >
              <video controls  :poster="trendsnode01[key].video.coverUrl" :src="mvurl[key]" class="trends-mddile02-bulk01-video-img"></video>
            </div>
            <!--<video controls class="video-paly" :poster="item.mv.imgurl" :src="mvurl[0].url">-->
            <!--</video>-->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import '../font_debtbfvurb/iconfont.css';

export default {
  name: 'trends',
  data() {
    return {
      Trendstitle: ['动态', '附近'],
      currentKey01: 0,
      color: 0,
      id: this.$storage.get('user').account.id,
      trendsnode: [],
      follow: '',
      trendsid: this.$storage.get('user').account.id,
      keyClick: 0,
      date: '',
      mvid: '',
      mvurl: [],
      trendsnode01: [],
      events: [],
      songurl: [],
    };
  },
  methods: {
    toggle(key) {
      this.currentKey01 = key;
      this.color = key;
    },
    trendstoggle(item, key) {
      this.trendsid = this.follow[key].userId;
      this.keyClick = key;
    },
    play(item, key) {
      console.log(key);
      console.log(item);
      // if (this.keyClick === key) {
      //   this.$refs.off.play();
      // }
    },
  },
  created() {
    // 2.获取用户关注列表
    this.$http.get(`/api/user/follows?uid=${this.id}&limit=5`).then((res) => {
      // 获取关注个数
      // console.log(res);
      this.follow = res.data.follow;
      // console.log(this.follow);
      // eslint-disable-next-line no-unused-vars
    }).catch((err) => {
      console.dir(err);
    });
    // 获取各种动态
    this.$http.get('/api/event?pagesize=20')
      .then((res) => {
        // 获取动态
        this.events = res.data.event;
        // console.log(this.events);
        for (let i = 0; i < res.data.event.length; i++) {
          this.trendsnode01.push(JSON.parse(res.data.event[i].json));
          // 是否存在歌曲
          if (this.trendsnode01[i].song) {
            // 获取歌曲地址
            this.$http.get(`http://localhost:3000/song/url?id=${this.trendsnode01[i].song.id}`).then((res) => {
              this.songurl.splice(i, 0, res.data.data[0].url);
            })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.songurl.splice(i, 0, '0');
          }
          // 是否存在视频
          if (this.trendsnode01[i].video) {
            this.$http.get(`/api/video/url?id=${this.trendsnode01[i].video.videoId}`).then((res) => {
              // console.log(res);
              console.log(i);
              this.mvurl.splice(i, 0, res.data.urls[0].url);
            }).catch((err) => {
              console.dir(err);
            });
          } else {
            this.mvurl.splice(i, 0, '0');
          }
          // 是否存在msg
          if (!this.trendsnode01[i].msg) {

          }
        }
        console.log(this.mvurl);
        console.log(this.trendsnode01);
        // eslint-disable-next-line no-unused-vars
      }).catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    // console.log(this.trendsid);
  },
};
</script>

<style scoped>
.trends-top{
  width: 100vw;
  height: 233px;
  background-color:#c84c3e ;
}
.trends-top-icon{
  display: inline-block;
  font-size: 75px;
  color: #ffffff;
  position: relative;
  top: 20px;
  margin-left: 19px;
}
.trends-top-icon01{
  display: inline-block;
  font-size: 70px;
  position: relative;
  left: 292px;
  top: 20px;
  color: #ffffff;
}
  .trends-top-bulk{
    display: inline-block;
    width: 422px;
    height: 88px;
    line-height: 88px;
    border: 1px #dfa29c solid;
    border-radius: 50px;
    margin-left: 291px;
    position: relative;
   top: 20px;
  }
  .trends-top-bulk01{
    position: relative;
    margin-left: 65px;
    color: #c2463a;
    z-index: 2;
  }
.trends-top-bulk-b{
  display: inline-block;
  position: absolute;
  top: 0;
  left:0;
  z-index: 1;
  width: 211px;
  height: 88px;
  background-color: #ffffff;
  border-radius: 50px;
}
.trends-top-mddile{
  width: 100vw;
  font-size: 0;
}
  .trends-top-mddile-bulk{
    display: inline-block;
    width: 50%;
    line-height: 113px;
    margin-top: 22px;
    color: #ffffff;
    text-align: center;
  }
  .trends-top-mddile-bulk-icon{
    display: inline-block;
    font-size: 60px;
  }
  .trends-top-mddile-bulk-word{
    display: inline-block;
    margin-left: 10px;
    font-size: 49px;
  }
 .trends-mddile{
   margin-top: 80px;
   margin-left: 30px;
 }
  .icon-xiayige{
    display: inline-block;
    margin-left: 10px;
    font-size: 32px;
    color: #7f7f7f;
  }
  .trends-mddile01{
    width: 100vw;
    height:276px ;
    font-size: 0;
    margin-top: 45px;
    border-bottom: 1px solid #e2e2e3;
  }
.trends-mddile01-bulk{
  display: inline-block;
  text-align: center;
}
  .trends-mddile01-img{
    width: 154px;
    height: 154px;
    border-radius: 50%;
  }
  .trends-mddile01-word{
    display: block;
    height: 38px;
    width: 20vw;
    margin-top: 10px;
    font-size: 36px;
    color:#7f7f80 ;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .trends-mddile02-all{
    width: 100%;
    padding: 60px 30px;
    border-bottom: 1px solid #e2e2e3;
  }
  .trends-mddile02{
    width: 1184px;
  }
  .trends-mddile02-img{
   width: 122px;
    height: 122px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .trends-mddile02-bulk{
    display: inline-block;
    height: 122px;
    font-size: 42px;
    color:#5a7cab;
    vertical-align: middle;
  }
  .trends-mddile02-bulk-word{
    display: inline-block;

  }
  .trends-mddile02-bulk-word01{
    display: inline-block;
    color: #646566;
  }
  .trends-mddile02-bulk-word02{
    display: block;
    color: #646566;
  }
.trends-mddile02-bulk01{
  width: 1034px;
  margin-left: 160px;
}
.trends-mddile02-bulk01-word{
  font-size: 42px;
  height: 95px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.trends-mddile02-bulk01-music{
  height: 150px;
  margin-top: 15px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
}
.trends-mddile02-bulk01-music-img{
    height: 122px;
    width: 122px;
  margin-left: 10px;
  }
  .trends-mddile02-bulk01-music-word{
    margin-left: 50px;
    height: 122px;
    font-size: 42px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .trends-mddile02-bulk01-music-word02{
    color: #666666;
  }
  .trends-mddile02-bulk01-video{
    width: 1034px;
    height: 584px;
    margin-top: 10px;
  }
  .trends-mddile02-bulk01-video-img{
    width: inherit;
    height: inherit;
    border-radius: 10px;
  }
</style>

<template>
    <div class="video-all">
      <img class="index-hd-img" src="../icon02/microphone.png"/>
      <div class="index-search__warp" >{{searchSuggest01}}</div>
      <img class=" index-hd-img-set" src="../icon02/menu.png"/>
      <div class="tab-warp">
      <span class="tab-item"
            :style="{width: (100/tabTitle.length) + 'vw'}"
            v-for="(item, key) in tabTitle"
            :key="key"
          @click="videoClick(key)"
          >{{item}}</span>
        <i class="underline"
           :style="{left: clickKey*(100/tabTitle.length) + 'vw',
         width: (100/tabTitle.length) + 'vw'}"></i>
      </div>
      <div class="video-all-foot">
      <div class="video-all-num" v-for="(item,key) in mvplay[0] " :key="key" >
         <video  class="video-all-paly" controls  :poster="item.data.coverUrl" :src="item.data.urlInfo.url">
         </video>
        <span class="video-all-word">{{item.data.title}}</span>
        <van-button @click="GiveClick(item.data.vid,key)">点赞</van-button>
        <span>{{item.data.praisedCount}}</span>
        <span>{{item.data.commentCount}}</span>
      </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'vision',
  data() {
    return {
      searchSuggest01: '',
      tabTitle: ['推荐', 'LOOK直播', '白羊', '现场', '听BGM'],
      mvlist: [],
      mvplay: [],
      clickKey: 0,
      give: [],
    };
  },
  methods: {
    videoTag(key) {
      this.$http.post(`/api/video/group?id=${key}`)
        .then((res) => {
          this.mvplay.unshift(res.data.datas);
          this.myplay.length = 8;
          console.log(this.mvplay[0].item.data.praisedCount);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GiveClick(key, num) {
      this.$http.post(`/api/resource/like?t=${this.mvplay[0][num].data.praised}&type=5&id=${key}`)
        .then((res) => {
          console.log(this.mvplay[0][num].data.praised);
          this.give = res.data;
          if (this.mvplay[0][num].data.praised) {
            this.mvplay[0][num].data.praisedCount++;
            this.mvplay[0][num].data.praised = !this.mvplay[0][num].data.praised;
          } else {
            this.mvplay[0][num].data.praisedCount--;
            this.mvplay[0][num].data.praised = !this.mvplay[0][num].data.praised;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    videoClick(key) {
      this.clickKey = key;
      if (key === 0) {
        this.$http.post('http://localhost:3000/video/group/list')
          .then((res) => {
            this.mvlist = res.data.data;
            this.mvlist.length = 24;
            this.videoTag(this.mvlist[23].id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (key === 1) {
        this.$http.post('http://localhost:3000/video/group/list')
          .then((res) => {
            this.mvlist = res.data.data;
            this.mvlist.length = 10;
            this.videoTag(this.mvlist[9].id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (key === 2) {
        this.$http.post('http://localhost:3000/video/group/list')
          .then((res) => {
            this.mvlist = res.data.data;
            this.mvlist.length = 20;
            this.videoTag(this.mvlist[19].id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (key === 3) {
        this.$http.post('http://localhost:3000/video/group/list')
          .then((res) => {
            this.mvlist = res.data.data;
            this.mvlist.length = 18;
            this.videoTag(this.mvlist[17].id);
            console.log(this.mvplay);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (key === 4) {
        this.$http.post('http://localhost:3000/video/group/list')
          .then((res) => {
            this.mvlist = res.data.data;
            this.mvlist.length = 9;
            this.videoTag(this.mvlist[8].id);
            console.log(this.mvplay);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    this.$http.get('http://localhost:3000/search/default')
      .then((res) => {
        this.searchSuggest01 = res.data.data.realkeyword;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/video/group/list')
      .then((res) => {
        this.mvlist = res.data.data;
        // for (let i = 0; i < 2; i++) {
        //   this.videoTag(this.mvlist[i].id);
        //   console.log(this.mvlist[i].id);
        // }
        this.mvlist.length = 24;
        this.videoTag(this.mvlist[23].id);
        console.log(this.mvplay);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
  .video-all{
   height: 250px;
    background-color:#c84c3e ;
  }
  .index-hd-img{
    height: 72px;
    width: 54px;
    vertical-align: middle;
    margin-left: 60px;
  }
  .index-hd-img-set{
    width: 70px;
    height: 71px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .index-search__warp{
    display: inline-block;
    width: 920px;
    height: 90px;
    margin: 30px 25px;
    border-radius: 45px;
    background-color: rgba(255,255,255,.3);
    opacity: .8;
    text-align: center;
    line-height: 90px;
    color: rgba(255,255,255,.8);
    font-size:44px ;
  }
  .tab-warp{
    font-size: 0;
    width: 100vw;
    position: relative;
    color: white;
  }
  .tab-item{
    display: inline-block;
    text-align: center;
    line-height: 74px;
    font-size: 42px;
  }
  .underline{
    font-size: 38px;
    transition: all ease-in .2s;
    position: absolute;
    bottom: -12px;
    left: 0;
    display: inline-block;
    width: 50vw;
    background-color: transparent;
    height: 12px;
  }
  .underline:before{
    content: '';
    display: inline-block;
    width: 2em;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: inherit;
    background-color: #fff;
    border-radius: 6px;
  }
  .video-all-foot{
    background-color:#f1f2f3 ;
  }
  .video-all-num{
    width:100vw ;
    height: 1033px;
    margin: 20px auto;
    background-color: #fbfcfd;
  }
  .video-all-paly{
    width:1207px;
    height: 681px;
    position: relative;
   left: 20px;
  }
  .video-all-word{
    display: block;
    width: 1207px;
    font-size: 45px;
    margin: 0px auto;
    height: 118px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>

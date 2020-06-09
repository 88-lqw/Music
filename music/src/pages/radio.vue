<template>
  <div class="today">
  <div class="today-word">今日优选<span class="today-word-bulk"><img src="../icon02/refresh.png" class="icon1"/>换一换</span></div>
  <div class="today-all">
  <div class="today-img" v-for="(item,key) in todayChose" :key="key">
    <img :src="item.picUrl" class="today-img-pic"/>
    <div class="today-bulk">
      <span class="today-bulk-title">{{item.name}}</span>
      <span class="today-bulk-p">节目：{{item.programCount}}</span>
      <span class="today-bulk-t">{{item.rcmdText}}</span>
    </div>
  </div>
  </div>
  <div class="today-good">
    <img src="../icon02/bg02.jpg" class="today-good-pic"/>
    <span class="today-good-w">精品推荐</span>
    <span class="today-good-w1">你值得拥有的优质内容</span>
    <div class="today-good-quality">
      <div class="today-good-quality-bulk" v-for="(item,key) in paygift" :key="key">
        <img :src="item.picUrl" class="today-good-quality-bulk-img"/>
        <span class="today-good-quality-bulk-word">{{item.lastProgramName}}</span>
        <span class="today-good-quality-bulk-price">￥{{item.originalPrice}}</span>
      </div>
      <span class="today-good-btn">全部精品电台<img src="../icon02/xiayige2.png" class="today-good-btn-pic"/></span>
    </div>
  </div>
    <div class="today-good-sing">创作|翻唱<img src="../icon02/xiayige.png" class="icon"/></div>
    <div class="today-good-sing1">
        <div class="today-good-quality-bulk" v-for="(item,key) in privatecontent" :key="key">
          <img :src="item.picUrl" class="today-good-quality-bulk-img"/>
          <span class="today-good-quality-bulk-word">{{item.name}}</span>
      </div>
    </div>
    <div class="today-good-sing">3D|电子<img src="../icon02/xiayige.png" class="icon"/></div>
    <div class="today-good-sing1">
      <div class="today-good-quality-bulk" v-for="(item,key) in playlist" :key="key">
        <img :src="item.coverImgUrl" class="today-good-quality-bulk-img"/>
        <span class="today-good-quality-bulk-word">{{item.name}}</span>
      </div>
    </div>
    <div class="today-good-sing">情感调频<img src="../icon02/xiayige.png" class="icon"/></div>
    <div class="today-good-sing1">
      <div class="today-good-quality-bulk" v-for="(item,key) in album" :key="key">
        <img :src="item.picUrl" class="today-good-quality-bulk-img"/>
        <span class="today-good-quality-bulk-word">{{item.name}}</span>
      </div>
    </div>
    <div class="today-good-sing">音乐故事<img src="../icon02/xiayige.png" class="icon"/></div>
    <div class="today-good-sing1">
      <div class="today-good-quality-bulk" v-for="(item,key) in playlist1" :key="key">
        <img :src="item.coverImgUrl" class="today-good-quality-bulk-img"/>
        <span class="today-good-quality-bulk-word">{{item.name}}</span>
      </div>
    </div>
    <div class="today-good-foot"></div>
  </div>
</template>

<script>
export default {
  name: 'radio',
  data() {
    return {
      todayChose: [],
      paygift: [],
      privatecontent: [],
      playlist: [],
      album: [],
      playlist1: [],
    };
  },
  created() {
    this.$http.get('http://localhost:3000/dj/today/perfered?limit=3')
      .then((res) => {
        console.log(res);
        this.todayChose = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/dj/paygift?limit=3&offset=0')
      .then((res) => {
        console.log(res);
        this.paygift = res.data.data.list;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/personalized/privatecontent?limit=3')
      .then((res) => {
        console.log(res);
        this.privatecontent = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/top/playlist?limit=3&order=new')
      .then((res) => {
        console.log(res);
        this.playlist = res.data.playlists;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/top/album?limit=3')
      .then((res) => {
        console.log(res);
        this.album = res.data.albums;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http.get('http://localhost:3000/top/playlist/highquality?limit=3&order=hot')
      .then((res) => {
        console.log(res);
        this.playlist1 = res.data.playlists;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
  .today::after{
    display: block;
    content: '';
    width: 100vw;
    height: 150px;
  }
 .today-word{
   width: 100vw;
   height: 109px;
   font-size: 48px;
   box-sizing: border-box;
   padding: 60px 22px ;
 }
 .today-word-bulk{
   display: inline-block;
   margin-left: 830px;
   font-size: 35px;
   color:#707071 ;
 }
 .icon1{
   width: 35px;
   height: 35px;
   vertical-align: middle;
 }
 .today-all{
   width: 100vw;
   overflow: hidden;
 }
  .today-img{
    width: 100vw;
    height: 311px;
  }
  .today-img-pic{
    vertical-align: top;
    width: 300px;
    height: 300px;
  }
  .today-bulk{
    display: inline-block;
    width: 890px;
    height: 300px;
    border-bottom: 1px #e2e2e3 solid;
  }
  .today-all{
    margin-top: 57px;
    box-sizing: border-box;
    padding: 0px 20px;
  }
  .today-bulk-title{
    display: block;
    font-size: 48px;
    font-weight: bold;
   margin-left: 27px;
    margin-top: 55px;
  }
  .today-bulk-p{
    display: block;
    margin-left: 30px;
    margin-top: 47px;
    font-size: 30px;
    color: #7d7d7e;
  }
 .today-bulk-t{
   display: block;
   margin-left: 30px;
   margin-top: 32px;
   font-size: 30px;
   color: #7d7d7e;
 }
  .today-good{
    height: 1031px;
    margin-top: 80px;
    position: relative;
  }
  .today-good-pic{
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 1031px;
    -webkit-filter: blur(5px); /* Chrome, Safari, Opera */
    filter: blur(6px);
  }
 .today-good-w{
   display: block;
   font-size: 51px;
   color: #d8d7d4;
   width: 100vw;
   text-align: center;
   margin-top: 57px;
 }
 .today-good-w1{
   display: block;
   font-size: 37px;
   color: #84837b;
   width: 100vw;
   text-align: center;
   margin-top: 23px;
 }
  .today-good-quality{
    width: 97vw;
    margin: 64px auto;
    font-size: 0;
  }
  .today-good-quality-bulk{
    display: inline-block;
    height: 592px;
    width: 395px;
    margin-left: 1px;
    background-color: #fff;
    border-radius: 20px;
  }
 .today-good-quality-bulk-img{
   width:395px ;
   height: 398px;
   border-radius: 20px;
 }
.today-good-quality-bulk-word{
  display: block;
  font-size: 36px;
  height: 81px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 24px;
}
  .today-good-quality-bulk-price{
    display: block;
    font-size: 28px;
    color: #c2463a;
    margin-top: 31px;
  }
  .today-good-btn{
    display: block;
    margin: 61px auto;
    width: 390px;
    border: 1px #9e8d71 solid;
    border-radius: 30px;
    font-size: 38px;
    line-height: 92px;
    text-align: center;
    color: #fffffe;
  }
  .today-good-btn-pic{
   width:25px ;
    height: 40px;
    margin-left:20px ;
    vertical-align: middle;
  }
  .today-good-sing{
    margin: 115px 0px 43px 20px;
    font-size: 50px;
  }
  .icon{
    height: 42px;
    width: 26px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .today-good-sing1{
    height:506px ;
   font-size: 0;
  }
  .today-good-foot{

  }
</style>

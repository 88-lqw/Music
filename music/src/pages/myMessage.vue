<template>
    <div class="box">
      <div class="top">
        <span class="top_item" @click="htmlReturn">
          <img src="../img/cancel.png" class="top_img1" alt="">
        </span>
        <span class="top_item top_center">我的消息</span>
        <span class="top_item">
            <img src="../icon02/menu.png" class="top_img" alt="">
        </span>
      </div>
      <div class="main">
        <span class="cont_top">
          <ul class="tab-title">
            <li @click="cur=0" :class="{active:cur==0}">私信</li>
            <li @click="cur=1" :class="{active:cur==1}">评论</li>
            <li @click="cur=2" :class="{active:cur==2}">@我</li>
            <li @click="cur=3" :class="{active:cur==3}">通知</li>
          </ul>
        </span>
        <div class="cont_txt">
          <div v-show="cur==0" class="txt_item">
            <div class="box_item" v-show="dynamicList.length===0">暂时还没有收到私信</div>
            <div v-show="dynamicList.length!==0" class="myConcern_item"
                 v-for="(item, index) in dynamicList" :key="index" @click="gohtml(item.userId)">
              <img :src="item.fromUser.avatarUrl" class="headPortrait" alt="">
              <div class="myConcern_item_right">
                <div class="myConcern_item_txt">
                  <p class="p1">
                    {{item.fromUser.nickname}}
                  </p>
                  <p class="p2">{{genderList[index]}}</p>
                </div>
                <div class="myConcern_item_more">
                  <span class="item_more_qe">10月12号</span>
                  <span class="num" v-if="item.newMsgCount!==0">{{item.newMsgCount}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-show="cur==1" class="txt_item">
            <div class="box_item" v-show="Commentarr.length===0">暂时还没有收到评论</div>
          </div>
          <div v-show="cur==2" class="txt_item">
            <div class="box_item" v-show="myarr.length===0">暂时还没有收到@</div>
          </div>
          <div v-show="cur==3" class="txt_item">
            <div class="box_item" v-show="messagearr.length===0">暂时还没有收到通知</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'myMessage',
  data() {
    return {
      cur: 0,
      id: this.$storage.get('user').account.id,
      dynamicList: [],
      genderList: [],
      Commentarr: [],
      myarr: [],
      messagearr: [],
    };
  },
  methods: {
    htmlReturn() {
      this.$router.back(-1);
    },
  },
  created() {
    this.$http.get('/api/msg/private').then((res) => {
      // console.log(res);
      this.dynamicList = res.data.msgs;
      this.dynamicList.forEach((item) => {
        this.genderList.push(JSON.parse(item.lastMsg).msg);
      });
    });
    this.$http.get(`/api/msg/comments?uid=${this.id}`).then((res) => {
      this.Commentarr = res.data.comments;
    });
    this.$http.get('/api/msg/forwards').then((res) => {
      console.log(res);
      this.myarr = res.data.forwards;
    });
    this.$http.get('/api/msg/notices').then((res) => {
      console.log(res);
      this.messagearr = res.data.notices;
    });
  },
};
</script>

<style scoped>
  .box{
    width: 100vw;
    height: 100vh;
  }
  .top{
    position: fixed;
    width: 1242px;
    height: 140px;
    background-color: #C64B3D;
    color: #fff;
    font-size: 0;
    text-align: center;
    line-height: 140px;
    z-index: 2;
  }
  .top_item{
    width: 170px;
    height: inherit;
    display: inline-block;
    float: left;
  }
  .top_center{
    width: 900px;
    font-size: 53px;
    color: #fff;
  }
  .top_img{
    width: 70px;
    height: 70px;
    vertical-align: middle;
  }
  .top_img1{
    width: 40px;
    vertical-align: middle;
  }
  .main{
    width: 100vw;
    position: absolute;
    top:140px;
  }

  .cont_top{
    display: inline-block;
    width: 100vw;
    border-bottom: 1px solid #E2E2E3;
    text-align: center;
  }
  .tab-title{
    border: 1px solid #E0A29D;
    display: inline-block;
    height: 100px;
    margin:15px 0;
    border-radius: 60px;
    font-size: 0;
  }
  .tab-title li{
    float: left;
    width: 212px;
    height: 80px;
    padding: 10px 0;
    text-align: center;
    background-color:#fff;
    border-radius: 60px;
    line-height: 80px;
    font-size: 45px;
    color: #C2463A;
  }
  /* 点击对应的标题添加对应的背景颜色 */
  .tab-title .active{
    background-color: #C2463A;
    color: #fff;
    line-height: 80px;
  }
  .cont_txt{
    width: 100vw;
  }
  .myConcern_item{
    width: 1242px;
    height: 210px;
  }
  .headPortrait{
    width: 162px;
    height: 162px;
    border-radius: 50%;
    float: left;
    margin-left: 32px;
    margin-top: 30px;
  }
  .myConcern_item_right{
    width: 1032px;
    height: 210px;
    border-bottom: 1px solid #EAEAEB;
    float: right;
    display: flex;
    align-items:center;
  }
  .myConcern_item_txt{
    width: 850px;
  }
  .p1, .p2{
    margin: 10px;
  }
  .p1{
    font-size: 48px;
  }
  .p2{
    font-size: 35px;
    color: #828283;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .myConcern_item_more{
    line-height: inherit;
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .item_more_qe{
    display: inline-block;
    font-size: 20px;
  }
  .num{
    display: inline-block;
    border-radius: 50%;
    padding: 12px;
    font-size: 33px;
    background-color:#C2463A;
    color: #fff;
  }
  .box_item{
    width: 100vw;
    margin-top: 10%;
    text-align: center;
    color: #666;
  }
</style>

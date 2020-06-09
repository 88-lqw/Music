<template>
   <div class="menu1">
     <span v-for='(item,key) in menuList' :key="key"
           class="menu1-bulk" @click="jumpKey(item,item.url)">
       <span  :class=" item.iconClass" class="menu1-bulk-img"  :style="`color: ${(color===item?'#c2463a':'#666666')}`"></span>
      <span class="menu1-bulk-w"  :style="`color: ${(color===item?'#c2463a':'#666666')}`">{{item.text}}</span> </span>
   </div>
</template>

<script>
import '../../font_debtbfvurb/iconfont.css';

export default {
  name: 'menu-bar',
  data() {
    return {
      // items: [
      //   { img: "../icon02/faxian.png", menuList: "发现", classColor: "isA" },
      //   { img: "../icon02/shiping.png", menuList: "视频", classColor: "isB" },
      //   { img: "../icon02/my.png", menuList: "我的", classColor: "isC" }
      //   { img: "../icon02/friends.png", menuList: "朋友", classColor: "isC" }
      //   { img: "../icon02/zhanghao.png", menuList: "账号", classColor: "isC" }
      //
      // ],
      menuList: [],
      color: '',
    };
  },
  methods: {
    jumpKey(item, url) {
      if (url === '/account') {
        this.$router.push({ path: url });
      }
      if (url === '/trends') {
        this.$router.push({ path: url });
      }
      if (url === '/vision') {
        this.$router.push({ path: url });
      }
      if (url === '/my') {
        this.$router.push({ path: url });
      }
      if (url === '/recommend') {
        this.$router.push({ path: url });
      }
      this.color = item;
    },
  },
  created() {
    this.$http.post('api.netMusic.com/menuBar')
      .then((res) => {
        this.menuList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
  .menu1{
    font-size: 0;
    position: fixed;
    bottom: 0px;
    height: 150px;
    /*line-height: 150px;*/
    text-align: center;
    background-color: #fff;
  }
 .menu1-bulk{
   width:20vw ;
   display: inline-block;
   font-size: 28px;
   margin-top: 20px;
 }
  .menu1-bulk-img{
    font-size: 73px;
    color:#666666 ;
  }
  .menu1-bulk-w{
    display: block;
    color: #ababab;
  }
</style>

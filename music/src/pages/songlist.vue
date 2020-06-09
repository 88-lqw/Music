<template>
   <div class="songlist">
     <div class="songlist-bulk">
       <img src="../img/cancel.png" @click="Return"/>
       <div class="songlist-bulk01">
         <span >歌曲</span>
       </div>
       <span class="songlist-bulk-img iconfont icon-fenxiang"></span>
     </div>
     <div class="songlist-top">
       <div class="songlist-bj">
         <img :src="songlistImgUrl" alt="">
       </div>
       <img :src="songlistImgUrl" alt="" class="songlist_img">
       <span class="songlist_box">
          <span class="songlist_box_item">
            <img src="../img/weChat.png" alt="" class="songlist_box_img1">
            <span class="songlist_box_txt">精品歌单</span>
            <img src="../icon02/xiayige2.png" alt="" class="songlist_box_img2">
          </span>
          <span class="songlist_box_item box_item_1">{{songlistName}}</span>
          <span class="songlist_box_item box_item_2">{{songlistcopywriter}}</span>
        </span>
     </div>
     <div v-for="(item , key) in songs" :key="key" @click="item.key=key,songlistClick(item,key)" class="songlist_songs" >
       {{item.name}}
     </div>
   </div>
</template>

<script>
import
{ mapState, mapMutations } from 'vuex';
import { store } from '../store';

export default {
  name: 'songlist',
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['songs']),
    ...mapState(['songlistImgUrl']),
    ...mapState(['songlistName']),
    ...mapState(['songlistcopywriter']),
  },
  methods: {
    ...mapMutations(['songlistClick']),
    Return() {
      this.$router.go(-1);
    },
  },
  created() {
    this.$api.getSonglist({ id: store.state.id });
  },
};
</script>

<style scoped>
  .songlist-bulk{
    line-height: 120px;
    background-color: #c5625f;
  }
  .songlist-bulk img{
    width:42px ;
    height: 70px;
    margin-left: 65px;
    vertical-align: middle;
  }
  .songlist-bulk01{
    width: 850px;
    text-align: center;
    display: inline-block;
    color: #ffffff;
    font-size: 60px;
    margin-left: 40px;
  }
  .songlist-bulk-img{
    color: #ffffff;
   font-size: 63px;
  }
  .songlist-top{
    width: 100vw;
    height: 500px;
    position: relative;
    padding-top: 140px;
    box-sizing: border-box;
    font-size: 0;
    overflow: hidden;
  }
  .songlist-bj{
    width: 120vw;
    height: 600px;
    position: absolute;
    top: -20px;
    filter: blur(10px);
    z-index:-1;
  }
  .songlist_img{
    display: inline-block;
    width: 300px;
    height: 300px;
    border-radius: 20px;
    margin:0 30px;
  }
  .songlist_box{
    overflow: hidden;
    display: inline-block;
    width: 800px;
    height: 300px;
  }
  .songlist_box_item{
    display: inline-block;
    width: 100vw;
    font-size: 60px;
    color: #fff;
  }
  .songlist_box_txt{
    line-height:2;
  }
  .songlist_box_img1{
    width: 80px;
    vertical-align: middle;
  }
  .songlist_box_img2{
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
  .songlist_songs{
    width: 100%;
    height: 40px;
    padding: 30px 20px;
    font-size: 40px;
    background-color: rgba(255,250,255,0.8);
  }
  .songlist_songs:nth-child(even){
    background-color: #e7e1cd;
  }
</style>

<template>
  <div class="index-container">
    <div class="index-hd">
      <img class="index-hd-img" src="../icon02/microphone.png"/>
    <div class="index-search__warp" @click="goToSearch">{{searchSuggest}}</div>
      <img class=" index-hd-img-set" src="../icon02/menu.png"  @click="songClick"/>
    <div class="tab-warp">
      <span class="tab-item"
            :style="{width: (100/tabTitle.length) + 'vw'}"
            @click="toggle(key)"
            v-for="(item, key) in tabTitle"
      :key="key">{{item}}</span>
      <i class="underline"
         :style="{left: currentKey*(100/tabTitle.length) + 'vw',
         width: (100/tabTitle.length) + 'vw'}"></i>
     </div>
      <van-swipe  :autoplay="3000" :loop="true" indicator-color="#c2463a" class="swiper-self">
      <van-swipe-item v-for="(item,key) in banners" :key="key" class="swiper-self-bulk"  >
        <img  :src="item.pic" >
      </van-swipe-item>
    </van-swipe>
    </div>
    <div class="category">
      <div class="category-item" v-for="(item,key) in category" :key="key" @click="clickItem(item.url)">
        <div class="category-img-bulk" >
          <img class="category-img" :src="item.iconClass"/>
        </div>
        {{item.text}}</div>
      </div>
    <transition :name="$route.query.transitionName">
      <router-view style="position: absolute;"></router-view>
    </transition>
    <menu-bar></menu-bar>

    <!--<div v-loading="test">-->
      <!--{{testdata}}-->
    <!--</div>-->
  </div>
</template>
<script>
// import { Dialog } from 'vant';
import { mapState } from 'vuex';

export default {
  name: 'index',
  data() {
    return {
      searchSuggest: '',
      currentKey: 0,
      test: true,
      testdata: '',
      swiperOption: {
        loop: true,
        autoplay: 3000,
        speed: 1000,
      },
      tabTitle: ['个性推荐', '主播电台'],
      category: [],
      currentComponent: 0,
    };
  },
  computed: {
    ...mapState(['banners']),
  },
  methods: {
    clickItem(url) {
      if (url === '/rec') {
        this.$router.push({ path: url });
      }
      if (url === '/songmenu') {
        this.$router.push({ path: url });
      }
    },
    toggle(key) {
      this.currentKey = key;
      if (key === 0) {
        this.$router.push({ path: '/recommend', query: { transitionName: 'slideToLeft' } });
        this.$http.post('api.netMusic.com/category', { type: 0 })
          .then((res) => {
            this.category = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push({ path: '/radio', query: { transitionName: 'slideToRight' } });
        this.$http.post('api.netMusic.com/category', { type: 1 })
          .then((res) => {
            this.category = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    goToSearch() {
      this.$router.push({ name: 'search' });
    },
    songClick() {
      this.$router.push({ name: 'play' });
    },
  },
  created() {
    setTimeout(() => {
      this.testdata = '新出炉的数据';
      this.test = false;
    }, 4000);
    this.$http.get('http://localhost:3000/search/default')
      .then((res) => {
        this.searchSuggest = res.data.data.realkeyword;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$api.getBanners({ type: 2 });
    this.$http.post('api.netMusic.com/category', { type: 0 })
      .then((res) => {
        this.category = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
  .slideToRight-enter{
    /*will-change: ;*/
    transform: translate3d(-100vw, 0, 0);
  }
  .slideToRight-enter-active{
    transition: all ease-in 1s;
  }
  .slideToRight-enter-to{
    transform: translate3d(0, 0, 0);
  }
  .slideToRight-leave{
    transform: translate3d(0, 0, 0);
  }
  .slideToRight-leave-active{
    transition: all ease-in 1s;
  }
  .slideToRight-leave-to{
    transform: translate3d(100vw, 0, 0);
  }

  .slideToLeft-enter{
    /*will-change: ;*/
    transform: translate3d(100vw, 0, 0);
  }
  .slideToLeft-enter-active{
    transition: all ease-in 1s;
  }
  .slideToLeft-enter-to{
    transform: translate3d(0, 0, 0);
  }
  .slideToLeft-leave{
    transform: translate3d(0, 0, 0);
  }
  .slideToLeft-leave-active{
    transition: all ease-in 1s;
  }
  .slideToLeft-leave-to{
    transform: translate3d(-100vw, 0, 0);
  }
  .index-container{
    width: 100vw;
    height: 50vh;
    border: 1px #fff solid;
  }

  .index-hd{
    height: 694px;
    background-color: #c84c3e;
    padding-top: 1px;
    position: relative;
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
    margin-top: 40px;
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
  .swiper-self{
    position: absolute;
    top: 330px;
    left: 20px;
    width: 1208px;
    height: 468px;
    border-radius: 15px;
    overflow: hidden;
  }
  .swiper-self-bulk{
    display: inline-block;
  }
  .swiper-self .swiper-self-bulk img{
    width: inherit;
    height: inherit;
    object-fit: contain
  }
  .custom-indicator-parent{
    position: absolute;
    top: 400px;
  }
  ul.custom-indicator{
    display: inline-block;
    width: inherit;
    position: absolute;
    bottom: 10px;
    text-align: center;
  }
  li.custom-indicator{
    display: inline-block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #ebedf0;
  }
  .category{
    font-size: 0;
    margin-top: 106px;
    height: 332px;
    color: #323233;
    border-bottom: 1px solid #e2e2e3;
  }
  .category-img-bulk{
    display: inline-block;
    margin-top: 50px;
    width: 25vw;
    text-align: center;;
    line-height: 40px;
  }
  .category-img{
    width: 169px;
    height: 169px;
  }
  .category-item{
    width: 25vw;
    display: inline-block;
    text-align: center;
    font-size: 35px;
    line-height: 60px;
  }

</style>

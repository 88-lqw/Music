<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        error
        @search="onSearch"
        @cancel="onCancel"
        shape="round"
        background="#C64B3D"
      />
    </form>
    <!--    按歌手搜索-->
    <div class="searchBySinger">
      <div class="searchBySinger-item">
        按歌手搜索<img src="../icon1/next.png" class="searchBySinger-img" />
      </div>
      <div class="searchBySinger-item"></div>
    </div>
    <!--    热门搜索-->
    <div class="hotSearch">
      <div class="hotSearch-title">热门搜索</div>
      <div class="hotSearch-word">
        <div class="hotSearch-word_item" v-for="(item, index) in hotSearch" :key="index">
          {{item.searchWord}}
          <img :src="item.iconUrl" class="hotSearch-img" alt="">
        </div>
      </div>
    </div>
    <div class="char">
      <img src="../icon1/banner01.png" alt="" class="char_img">
    </div>
    <!--    搜索历史-->
    <div class="deleteHistory">
      <div class="deleteHistory-title">
        <span class="title deleteHistory-title_item">搜索记录</span>
        <span class="img deleteHistory-title_item">
          <img src="../icon1/delete.png" class="deleteHistory-img" alt="">
        </span>
      </div>
      <div class="hotSearch-word">
        <div class="hotSearch-word_item" v-for="(item, index) in searchDefault" :key="index">
          {{item.first}}
        </div>
      </div>
      <div class="hotSearch-word">
        <div class="hotSearch-word_item" v-for="(item, key) in searchHistory" :key="key">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  name: 'search',
  data() {
    return {
      value: '',
      searchSong: '',
      hotSearch: [],
      searchHistory: [],
      searchDefault: [],
    };
  },
  methods: {
    onSearch() {
      this.searchHistory.push(this.searchSong);
      this.searchSong = '';
    },
    onCancel() {
      this.$router.push({ path: '/recommend' });
    },
  },
  created() {
    this.$http.get('http://localhost:3000/search/default').then((res) => {
      this.searchSong = res.data.data.realkeyword;
      // eslint-disable-next-line no-unused-vars
    }).catch((res) => {
      // console.log(res);
    });
    // 热门搜索关键字
    this.$http.get('http://localhost:3000/search/hot/detail').then((res) => {
      this.hotSearch = res.data.data;
      // eslint-disable-next-line no-unused-vars
    }).catch((res) => {
      // console.log(res);
    });
    // 热门搜索关键字
    this.$http.get('http://localhost:3000/search/hot').then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      this.searchDefault = res.data.result.hots;
      // this.hotSearch = res.data.data;
      // eslint-disable-next-line no-unused-vars
    }).catch((res) => {
      // console.log(res);
    });
  },
  // 导航守卫
  beforeRouteLeave(to, from, next) {
    Dialog.confirm({
      title: '温馨提示',
      message: '你真的忍心离开?',
    })
      .then(() => {
        next();
      })
      .catch(() => {
        next(false);
      });
  },
};
</script>

<style scoped>
  .van-search__action{
    color: #fff;
  }
  .van-search__action:hover{
    background: unset;
  }
  .van-field__body{
    height: inherit;
    color: #fff;
  }
  .van-search__content{
    background-color: #D06B62;
  }
  .van-cell{
    color: #DC978F;
    font-size: 20px;
  }

  .searchBySinger{
    width: 100vw;
    height: 149px;
    border-bottom: 1px solid #EAEAEB;
    display: flex;
  }
  .searchBySinger-item{
    flex: 1;
    line-height: 149px;
    font-size: 45px;
    font-weight: 600;
    text-indent: 34px;
  }
  .searchBySinger-img{
    width: 16px;
    height: 29px;
    margin-left: 20px;
  }
  .char{
    width: 90vw;
    height:300px;
    margin:15px auto;
  }
  .char_img{
    width: inherit;
    height: inherit;
  }
  /*热门搜索*/
  .hotSearch{
    width: 100vw;
  }
  .hotSearch-title{
    width: 100vw;
    height: 140px;
    line-height: 170px;
    font-size: 40px;
    text-indent: 20px;
    font-weight: 600;
  }
  .hotSearch-word{
    width: 98vw;
    margin: auto;
  }
  .hotSearch-word_item{
    display: inline-block;
    padding: 40px 50px;
    background-color: #EFEFF0;
    border-radius: 55px;
    font-size: 30px;
    margin-left: 20px;
    margin-top: 25px;
  }
  .hotSearch-img{
    height: 40px;
    margin-left: 11px;
  }
  /*搜索历史*/
  .deleteHistory{
    width: 100vw;
    margin-top: 50px;
  }
  .deleteHistory-title{
    width: 100vw;
    height: 115px;
    line-height: 115px;
    text-indent: 20px;
    font-size: 40px;
    font-weight: 600;
  }
  .deleteHistory-title_item{
    display: inline-block;
    width: 590px;
  }
  .img{
    text-align: right;
  }
  .deleteHistory-img{
    width: 54px;
    height: 54px;
  }

</style>

<template>
  <div class="box">
    <div class="vip">会员中心</div>
    <div class="look">查看更多VIP内容</div>
    <div class="xzimg">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../icon02/banner01.png" alt="">
          </div>
          <div class="swiper-slide"><img src="../icon02/banner04.png" alt=""></div>
          <div class="swiper-slide"><img src="../icon02/banner05.png" alt=""></div>
        </div>
      </div>
    </div>
    <div class="btn">
          <span class="Boutique_button">
            进入会员中心
          <img src="../icon02/xiayige2.png" alt="" class="songTitle_img">
        </span>
    </div>
  </div>
</template>

<script>/* eslint-disable no-unused-vars,no-undef,prefer-const */

export default {
  name: 'spin',
  methods: {
    fn() {
      let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        effect: 'coverflow',
        disableOnInteraction: false,
      });
    },
  },
  mounted() {
    this.fn();
  },
};
</script>

<style scoped>
  .box {
    width: 100%;
    height: 995px;
    margin-bottom: 100px;
    background: linear-gradient(to right, #ccc, #6081A9, #753F37, #CBCCCA);
  }
  .vip{
    text-align: center;
    font-size: 50px;
    color: white;
    font-weight: bold;
    box-sizing: border-box;
    padding-top: 50px;
  }
  .look{
    text-align: center;
    font-size: 35px;
    color:#bcadac;
    box-sizing: border-box;
    padding-top: 30px;
    padding-bottom: 45px;
  }
  .xzimg {
    height: 560px;
    box-sizing: border-box;
  }
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    width: 80%;
    transform: scale(0.9);
  }
  .swiper-slide img {
    width: 100%;
    height: 560px;
  }
  .Boutique_button{
    display: block;
    width: 390px;
    line-height: 90px;
    margin:50px auto 0;
    font-size: 45px;
    text-align: center;
    border-radius: 90px;
    color: #fff;
    border: 2px solid #fffeff;
  }
  .songTitle_img{
    width: 35px;
    height: 48px;
    overflow: hidden;
    vertical-align: middle;
  }

  .swiper-slide-active {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

</style>


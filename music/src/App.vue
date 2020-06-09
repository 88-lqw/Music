<template>
  <div id="app" >
    <router-view></router-view>
    <menu-bar v-show="$route.meta.hasMenuBar"></menu-bar>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  width: 100vw;
  box-sizing: border-box;
}
  #app::after{
    display: block;
    content: '';
    width: 100vw;
    height: 150px;
  }
</style>

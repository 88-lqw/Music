<template>
    <div>登录成功</div>
</template>

<script>
export default {
  name: 'rec',
  created() {
    this.$http.get('/api/remmend/resourrce')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.message.indexOf('Network Error') > -1) {
          alert('网络似乎断开了连接');
        }
        this.$storage.remove('user');
        this.$router.go(-1);
      });
  },
};
</script>

<style scoped>

</style>

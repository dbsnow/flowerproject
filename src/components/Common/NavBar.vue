<template>
  <div class="flower-s-header">
    <h1 @click="goback">&nbsp;&lt;</h1>
    <h1 class="page-title">{{title}}</h1>
  </div>
</template>
<script>
export default {
  // 组件名
  name: 'nav-bar',
  // 父传子的参数作为title显示
  props: ['title'],
  methods: {
    // 返回功能
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .flower-s-header{
    height: 40px;
    background-color: #f7f7f7;
  }
  .page-title{
  }
  h1, h2{
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
</style>

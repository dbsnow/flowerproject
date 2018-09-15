<template>
<div>
  <mt-header title="鲜花管理项目"></mt-header>
  <router-view class="tmpl" />
  <mt-tabbar v-if="$route.meta.navShow" v-model="selected">
    <mt-tab-item id="home">
      <img @click="changeHash" slot="icon" src="./assets/img/index.png">
      首页
    </mt-tab-item>
    <mt-tab-item id="flower.list">
        <img @click="changeHash" slot="icon" src="./assets/img/flower.png">
        鲜花
    </mt-tab-item>
    <mt-tab-item id="photo.list">
      <img @click="changeHash" slot="icon" src="./assets/img/share.png">
      图文
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>
<script>
export default {
  data () {
    return {
      // 默认选中home
      selected: 'home'
    }
  },
  methods: {
    changeHash () {
      // 该调用早于了 子组件赋值给父组件的selected
      // console.log(this.selected)

      this.$nextTick(function () {
        // 在vue完成渲染任务以后的行为
        if (this.selected === 'photo.list') {
          // 图文需要传参数，编程式路由跳转，相当于声明式router-link
          this.$router.push({
            name: this.selected,
            params: {categoryId: 0}
          })
        } else {
          this.$router.push({
            name: this.selected
          })
        }
      })
    }
  },
  watch: {
    selected (newV, oldV) {
      // this.$router.push({
      //   name: newV
      // })
    },
    '$route' (to, from) {
      if (to.name) {
        this.selected = to.name
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-tabbar{
  position: fixed;
  bottom: 0;
}
.mint-header-title{
  font-size: 18px;
}
</style>

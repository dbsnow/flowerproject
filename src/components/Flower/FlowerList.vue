<template>
  <div class="tmpl">
    <nav-bar title="鲜花列表"/>
    <div class="flower">
      <ul class="flower-list">
        <li class="flower-item" v-for="flower in flowerList" :key="flower.id">
          <router-link class="flower-link" :to="{name:'flower.detail',params:{id:flower.id}}">
          <img :src="flower.pic" alt="">
          <div class="flower-info">
            <div class="flower-title">{{flower.title}}</div>
            <div class="flower-desc text_limit">花语：{{flower.flower_language}}</div>
            <div class="flower-price text_right">价格：<span class="flower-price_red">￥{{flower.price}}</span></div>
          </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      flowerList: []
    }
  },
  created () {
    this.$axios.get('/api/getBouquetList')
      .then(res => { this.flowerList = res.data.message })
      .catch(err => console.log('花束列表异常', err))
  }
}
</script>
<style lang="scss" scoped>
  $line-color: #cbcbcb;
  .mint-tabbar{
    display: none;
  }
  .flower{
    &-list{
      padding: 1.5rem;
      margin-bottom: 3rem;
    }
    &-item{
      padding: 1rem 0;
      border-bottom: 1px solid $line-color;
      &:last-child{
        border: 0;
      }
    }
    &-title{
      font-weight: 600;
    }
    &-link{
      display: flex;
      flex-grow: 1;
    }
    &-desc{
      height: 2rem;
    }
    &-info{
      font-size: 15px;
      margin-left: 2.5rem;
    }
    &-price{
      font-size: 14px;
      &_red{
        color: red;
      }
    }
  }
  .flower-s-header{
    height: 4rem;
    background-color: #f7f7f7;
  }
  .page-title{
    margin-left: 25%;
  }
  h1, h2{
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
  img{
    width: 60px;
    max-width: 100%;
    height: 60px;
  }
  ul{
    padding: 15px;
  }
  ul li{
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
  }
</style>

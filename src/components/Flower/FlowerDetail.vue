<template>
  <div class="tmpl">
    <nav-bar title="鲜花详情"/>
    <div class="detail">
      <p class="detail-title text_center">{{flowerDetail.title}}</p>
      <div class="detail-content">
        <img class="detail-pic" :src="flowerDetail.pic_lg" alt="">
        <div class="detail-lan">（{{flowerDetail.flower_language}}）</div>
        <div class="detail-desc" v-html="flowerDetail.desc"></div>
        <div class="detail-evaluate">商品评价：
          <span class="detail-evaluate_red">{{flowerDetail.evaluate}}</span>
          <span class="detail-evaluate_small">好评</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      flowerDetail: {}
    }
  },
  created () {
  // 获取路由查询字符串
    let id = this.$route.params.id
    this.$axios.get('/api/getBouquetDetail/' + id)
      .then(res => {
        this.flowerDetail = res.data.message
      })
      .catch(err => console.log(err))
  }
}
</script>
<style lang="scss" scoped>
  .detail{
    padding: 3rem 1.5rem 3rem;
    font-size: 16px;
    &-title{
      padding: 0 0 3rem;
      font-size: 18px;
      font-weight: 600;
    }
    &-pic{
      display: block;
      width: 30rem;
      height: 30rem;
      max-width: 100%;
      margin: 0 auto;
    }
    &-lan{
      font-style: italic;
      font-size: 14px;
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
    &-desc{
      color: $gray-color;
      text-indent: 2em;
    }
    &-evaluate{
      &_red{
        color: red;
        font-size: 17px;
      }
      &_small{
        font-size: 13px;
      }
    }
  }
  /*.flower-title p {*/
    /*color: #0a87f8;*/
    /*font-size: 20px;*/
    /*font-weight: bold;*/
  /*}*/

  /*.flower-title span {*/
    /*display: inline-block;*/
    /*margin-right: 30px;*/
  /*}*/
</style>

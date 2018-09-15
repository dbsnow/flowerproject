<template>
  <div>
    <!--上有轮播图，下有九宫格-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img, index) in imgs" :key="index">
        <img :src="img.img">
      </mt-swipe-item>
    </mt-swipe>
    <div class="grid">
      <my-ul>
        <my-li v-for="(grid, index) in grids" :key="index">
          <router-link :to="grid.router">
            <span class="icon" :class="grid.className"></span>
            <span>{{grid.title}}</span>
          </router-link>
        </my-li>
      </my-ul>
    </div>
    <div class="vip clearfix">
      <span class="pull_left">加入超级会员享受优惠</span>
      <span class="pull_right">立即开通&nbsp;&nbsp;></span>
    </div>
    <p class="best">每日推荐</p>
    <ul class="list">
      <li class="list-item">
        <img src="../../../static/img/bouquet/time.jpg" alt="">
        <div class="list-info">
          <p class="list-title">最美的时光</p>
          <p class="list-desc">有你在身边，是我此生经历的最美时光！你就是无可取代！</p>
        </div>
      </li>
      <li class="list-item">
        <img src="../../../static/img/bouquet/sample.jpg" alt="">
        <div class="list-info">
          <p class="list-title">简单快乐</p>
          <p class="list-desc">人要快乐很简单，心胸开阔乐无边，幸福就像毛毛雨，你觉得幸福它就会落下来！</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 轮播图数据
      imgs: [],
      grids: [
        {className: 'flower-news', title: '鲜花展示', router: {name: 'flower.list'}},
        {className: 'flower-share', title: '图文分享', router: {name: 'photo.list', params: {categoryId: 0}}},
        {className: 'flower-goods', title: '商品展示', router: {name: 'flower.list'}},
        {className: 'flower-feedback', title: '留言反馈', router: {name: 'flower.list'}},
        {className: 'flower-find', title: '搜索鲜花', router: {name: 'flower.list'}},
        {className: 'flower-contact', title: '联系我们', router: {name: 'flower.list'}}]
    }
  },
  // created创建组件的生命周期函数中，可以操作数据
  created () {
    this.$axios.get('/api/getBanners')
      .then(res => {
        // res.data.message = [{img:'图片地址'}]
        this.imgs = res.data.message
      })
      .catch(err => console.log('轮播图异常', err))
  }
}
</script>
<style lang="scss" scoped>
  .mint-swipe{
    height:200px;
  }
  /*有可能有坑*/
  img{
    width: 100%;
    max-width: 100%;
  }
  .grid{
    font-size: 15px;
    ul{
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    li{
      list-style: none;
      float: left;
      width: 33.3%;
      text-align: center;
      padding: 20px 0;
    }
  }
  /*九宫格图片*/
  .icon{
    display: block;
    width: 30px;
    height: 30px;
    margin: 5px auto;
    background-repeat: round;
  }
  .flower-news{
    background-image: url('../../assets/img/news.png');
  }
  .flower-share{
    background-image: url('../../assets/img/share.png');
  }
  .flower-goods{
    background-image: url('../../assets/img/goods.png');
  }
  .flower-contact{
    background-image: url('../../assets/img/contact.png');
  }
  .flower-find{
    background-image: url('../../assets/img/find.png');
  }
  .flower-feedback{
    background-image: url('../../assets/img/feedback.png');
  }
  .vip{
    padding: 0.5rem 1rem;
    margin: 0 1.5rem;
    font-size: 15px;
    background-color: #ebd9ab;
    color: #333;
    border-radius: 3px;
  }
  .best{
    font-size: 15px;
    margin-top: 1.5rem;
    padding-left: 1.5rem;
  }
  .list{
    padding: 0 1.5rem;
    margin: 1rem 0 6.5rem;
    &-item{
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      padding: 1rem 0;
      img{
        width: 60px;
        height: 60px;
        max-width: 100%;
      }
    }
    &-info{
      margin-left: 1.5rem;
      color: #333;
    }
    &-title{
      font-size: 15px;
      font-weight: 600;
    }
    &-desc{
      font-size: 14px;
    }
  }
</style>

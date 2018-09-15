<template>
  <div class="tmpl">
    <nav-bar title="图文分享" />
    <!--引入返回导航-->
    <div class="share">
      <ul class="share-header">
        <li class="share-link" v-for="c in categorys" :key="c.id">
          <a @click="loadImgsByCategoryId(c.id)" href="javascript:;">{{c.title}}</a>
        </li>
      </ul>
      <!--下方的图片-->
      <div class="share-content">
        <ul class="share-list">
          <li class="share-item" v-for="img in imgs" :key="img.id">
            <!--关于value是否给单引号的问题：-->
            <!--给了是字符串，不给是从vue中获取数据-->
            <router-link :to="{name:'photo.detail',query:{id:img.id}}">
              <div class="share-info">
                <img v-lazy="img.img_url" alt="">
                <p>
                  <span>{{img.title}}</span>
                  <br>
                  <span>{{img.zhaiyao}}</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgs: [],
      categorys: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // 路由复用，但参数改变触发
    // 参数指的是：query||params
    // console.log(to)
    this.loadImgById(to.params.categoryId)
    next()
  },
  created () {
    // 1：获取路由参数categoryId
    let categoryId = this.$route.params.categoryId
    this.loadImgById(categoryId)
    // 2：获取分类信息
    this.$axios.get('https://www.sinya.online/api/getimgcategory')
      .then(res => {
        this.categorys = res.data.message
        this.categorys.unshift({
          id: 0,
          title: '全部'
        })
      })
      .catch(err => console.log('获取分类信息失败', err))
  },
  methods: {
    loadImgsByCategoryId (categoryId) {
      this.$router.push({
        name: 'photo.list',
        params: {
          categoryId
        }
      })
    },
    loadImgById (id) {
      // 2：获取url拼接参数发请求
      this.$axios.get('https://www.sinya.online/api/getimages/' + id)
        .then(res => {
          this.imgs = res.data.message
          // 判断是否imgs.length==0
          if (this.imgs.length === 0) {
            // iconfont icon-tupian
            this.$toast({
              message: '暂无图片',
              iconClass: 'iconfont icon-tupian'
            })
          }
        })
        .catch(err => console.log('图片列表获取失败', err))
      // 3：获取数据做渲染
    }
  }
}
</script>
<style lang="scss" scoped>
  .share{
    font-size: 16px;
    &-header{
      height: 3.5rem;
      line-height: 3.5rem;
      padding-left: 1.5rem;
      white-space: nowrap;
      overflow-x: scroll;
      background-color: #f7f7f7;
      position: -webkit-sticky;
      position: sticky;
      top: 0; // 使用和 Fixed 同样的方式设定位置
    }
    &-link{
      display: inline-block;
      padding-right: 1rem;
    }
    &-content{
      margin: 1rem 0 3rem;
    }
    &-info{
      font-size: 15px;
      padding: 1rem 1.5rem;
      color: $gray-color;
      text-align: justify;
      img {
        display: block;
        width: 300px;
        height: 300px;
        margin: 0 auto;
        max-width: 100%;
      }
    }
  }
  /*图片懒加载样式*/
  image[lazy=loading]{
    width: 40px;
    height:300px;
    margin: auto;
  }
</style>

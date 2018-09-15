<template>
  <div>
    <nav-bar title="图文详情" />
    <div class="photo">
      <p class="photo-title">{{info.title}}</p>
      <p class="photo-time text_right">发起日期：{{info.add_time | convertTime('YYYY-MM-DD')}}</p>
      <ul class="clearfix">
        <!--<vue-preview :slides="imgs"></vue-preview>-->
        <li class="photo-item pull_left" v-for="(img, index) in imgs" :key="index">
          <img :src="img.src" alt="">
        </li>
      </ul>
      <div class="photo-content">
        <p v-html="info.content"></p>
      </div>
      <!--使用评论组件-->
      <comment :cid="$route.query.id"/>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      // 详情
      info: {},
      imgs: []
    }
  },
  created () {
    let id = this.$route.query.id
    // 发起请求
    this.$axios.get('https://www.sinya.online/api/getimageInfo/' + id)
      .then(res => {
        this.info = res.data.message[0]
      })
      .catch(err => console.log('图文详情获取失败', err))

    // 获取缩略图
    this.$axios.get('https://www.sinya.online/api/getthumimages/' + id)
      .then(res => {
        this.imgs = res.data.message

        // this.imgs.forEach(img => {
        //   img.msrc = img.src
        //   img.w = 600
        //   img.h = 400
        // })
      })
      .catch(err => console.log('缩略图获取失败', err))
  }
}
</script>
<style lang="scss" scoped>
  .photo{
    margin: 0 1.5rem 3rem;
    &-title{
      font-size: 18px;
      font-weight: 600;
      text-align: justify;
    }
    &-time{
      padding: 1rem 0;
      font-size: 13px;
    }
    &-item{
      width: 33%;
      img{
        width: 100px;
        height: 100px;
        max-width: 100%;
        margin: 0 auto;
      }
    }
    &-content{
      font-size: 15px;
      color: $gray-color;
      margin: 1rem 0;
      text-align: justify;
    }
  }
</style>

<template>
  <div class="comment">
    <ul class="comment-list">
      <li class="comment-row">
        <span>提交评论</span>
        <span>返回</span>
      </li>
      <li class="comment-row">
        <textarea v-model="newComment" cols="30" rows="10"></textarea>
      </li>
      <li class="comment-row">
        <mt-button size="large" type="primary" @click="sendMsg">发表评论</mt-button>
      </li>
    </ul>
    <ul class="comment-txt">
      <li>评论</li>
    </ul>
    <ul class="comment-content">
      <li v-for="(msg,index) in msgs" :key="index">
        {{msg.user_name}}：{{msg.content}}
        <!--{{msg.add_time | relativeTime}}-->
      </li>
    </ul>
    <mt-button type="danger" size="large" plain @click="loadMore(page)">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  name: 'comment',
  props: ['cid'],
  data () {
    return {
      // 组件内控制页码
      page: '1',
      // 消息数据
      msgs: {},
      newComment: ''
    }
  },
  created () {
    // 使用组件的时候，是否有页码，如果有就对了，没有就是默认第一页
    this.page = this.$route.query.page || '1'
    this.loadMore()
  },
  methods: {
    // 根据页码发请求
    // firstLoad (page) {
    //   this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
    //     .then(res => {
    //       if (res.data.message.length === 0){
    //         this.$toast('没有更多数据了')
    //       }
    //       this.msgs = res.data.message
    //       // 页码
    //       this.page++
    //     })
    //     .catch(err => console.log('评论获取失败', err))
    // },
    // 点击按钮调用
    // 该函数传参，标识页面点击按钮，这个时候数据是追加，否则不传参数，就是赋值，一般来讲是针对第一次或者刷新第n页数据的时候
    loadMore (page) {
      this.$axios.get(`https://www.sinya.online/api/getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          if (res.data.message.length === 0) {
            this.$toast('没有更多数据了')
          }
          if (page) {
            this.msgs = this.msgs.concat(res.data.message)

          } else {
            this.msgs = res.data.message
          }
          this.page++
        })
        .catch(err => console.log('评论获取失败', err))
    },
    // 发表评论
    sendMsg () {
      // 发表之前判断是否为空
      if(this.newComment.trim() === ''){
        return this.$toast('评论信息不能为空！')
      }
      // 获取评论信息 this.newComment
      this.$axios.post('https://www.sinya.online/api/postcomment/' + this.cid, 'content=' + this.newComment)
        .then(res => {
          // 发表之后，清空评论
          this.newComment = ''
          this.page = 1
          this.loadMore()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .comment{
    &-row{
      margin: 1rem 0;
      font-size: 13px;
    }
    &-txt{
      font-size: 13px;
      padding: 1rem 0;
    }
    &-content{
      font-size: 13px;
      margin-bottom: 1rem;
    }
  }
</style>

<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar title="黑马头条" :fixed="true" />
    <!-- 导入，注册，并使用ArticleInfo组件 -->
    <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo 
        v-for="item in artlist" 
        :key="item.id" 
        :title="item.title" 
        :author="item.aut_name" 
        :cmtCount="item.comm_count" 
        :time="item.pubdate" 
        :cover="item.cover"></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需导入 API 接口
import { getArticleListAPI } from '/src/api/articleAPI.js'
import ArticleInfo from '/src/components/Article/Articleinfo.vue'

export default {
  name: 'Home',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      artlist: [],
      // 是否正在加载下一页数据，如果 loading 为 true ，则不会反复触发 load 事件
      // 当下一页数据请求回来后，一定要把 loading 从 true 改为 false
      loading: true,
      // 数据是否加载完毕了，如果没有更多数据了，一定要把 finished 改为 true
      finished: false,
      //是否下拉刷新
      refreshing: false,
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(refreshing) {
      // 发起 GET 请求获取文章列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)

      if (refreshing) {
        // 证明是下拉刷新
        // // this.artlist= [新数据在后，旧数据在前]
        this.artlist = [...res, ...this.artlist]
        this.refreshing = false
      } else {
        // 证明是上拉加载更多
        // this.artlist= [旧数据在前，新数据在后]
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }
      // this.artlist = [...res, ...this.artlist]
      // console.log(res)
      if (res.length === 0) {
        this.finished = true
      }
    },
    //只要 onload 被调用，就请求下一页数据
    onLoad() {
      // 让页码值加1
      this.page++
      // 重新请求接口数据
      this.initArticleList()
    },
    // 下拉刷新函数
    onRefresh() {
      // 让页码值加1
      this.page++
      // 重新请求接口数据
      this.initArticleList(true)
    },
  },
  components: {
    ArticleInfo,
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  // .van-nav-bar {
  //   background-color: #007bff;
  // }

  /deep/.van-nav-bar__title {
    color: white;
  }
}
</style>

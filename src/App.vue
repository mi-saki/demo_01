<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- tabbar区域 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="less" scoped></style>

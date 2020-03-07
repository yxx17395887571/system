<template>
  <div class="author">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: '/user',query: { name: this.$router.options.routes[3].children[0].meta.info } }"
      >首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.author{
  margin-top: 10px;
}
</style>
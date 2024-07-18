<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="aside">
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header class="header"><AppHeader /></el-header>
        <el-main class="main"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import AppMenu from "@/components/AppMenu.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>
<style scoped lang="scss">
.container {
  .aside {
    background: #797979;
    width: 230px;
  }
  .header {
    // background: #66a6ff;
    background-color: #409eff;
    height: 80px;
    box-sizing: border-box;
    color: #fff;
    // font-size: 20px;
  }
  .main {
    height: calc(100vh - 80px);
  }
}
</style>

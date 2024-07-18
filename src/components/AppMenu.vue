<template>
  <div class="logo">
    <!-- <CommunityIcon /> -->
    <el-icon><Promotion /></el-icon>
  </div>
  <el-menu
    :default-active="userObj.menuActive"
    :collapse="props.isCollapse"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    background-color="#3ba2b4"
    text-color="#FFF"
    active-text-color="#2F74FF"
    class="menu"
    router
  >
    <el-menu-item index="1" route="/home">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>首页</span>
      </template>
    </el-menu-item>
    <div v-if="userObj.role == 'admin'">
      <el-menu-item index="2" route="/userManagement">
        <el-icon><icon-menu /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="9" route="/noticeManagement">
        <el-icon><icon-menu /></el-icon>
        <template #title>公告管理</template>
      </el-menu-item>
      <el-menu-item index="10" route="/vaccineManagement">
        <el-icon><icon-menu /></el-icon>
        <template #title>疫苗管理</template>
      </el-menu-item>
    </div>

    <div v-if="userObj.role == 'user'">
      <el-menu-item index="3" route="/archivesManagement">
        <el-icon><icon-menu /></el-icon>
        <template #title>档案管理</template>
      </el-menu-item>
      <el-menu-item index="4" route="/healthCondition">
        <el-icon><document /></el-icon>
        <template #title>健康状况</template>
      </el-menu-item>

      <el-menu-item index="7" route="/healthEvaluation">
        <el-icon><document /></el-icon>
        <template #title>健康评价</template>
      </el-menu-item>
    </div>
    <div v-if="userObj.role == 'parents'">
      <el-menu-item index="8" route="/childrenInfo">
        <el-icon><icon-menu /></el-icon>
        <template #title>儿童信息</template>
      </el-menu-item>
    </div>
    <div v-if="userObj.role == 'parents' || userObj.role == 'user'">
      <el-menu-item index="5" route="/physicalExamination">
        <el-icon><icon-menu /></el-icon>
        <template #title>体检记录</template>
      </el-menu-item>
      <el-menu-item index="6" route="/prophylacticVaccination">
        <el-icon><document /></el-icon>
        <template #title>预防接种</template>
      </el-menu-item>
    </div>
    <!-- <el-sub-menu index="9" disabled>
      <template #title>
        <el-icon><setting /></el-icon>
        <span>设置</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Promotion
} from "@element-plus/icons-vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const userObj = userStore.userObj;
const props = defineProps(["isCollapse"]);

onMounted(() => {
  console.log(userObj);
});
const handleSelect = (key: string, keyPath: string[]) => {
  userStore.setUserObj({ menuActive: key });
};
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.logo {
  height: 80px;
  /* background: #409EFF; */
  background-color: #3ba2b4;
  text-align: center;
  line-height: 80px;
}
.menu {
  min-height: calc(100vh - 80px);
}
</style>

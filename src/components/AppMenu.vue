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
    <!-- <el-menu-item index="1" route="/home">
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
    </div> -->

    <div v-if="userObj.role == 'user'">
      <div v-for="(item, index) in menuList" :key="index">
        <div v-if="!item.children || !item.children.length">
          <el-menu-item :index="item.key" :route="item.route">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </div>
        <div v-else>
          <el-sub-menu :index="item.key">
            <!-- 一级菜单标题 -->
            <template #title>
              <el-icon><setting /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group>
              <div v-for="(j, idx) in item.children" :key="idx">
                <div v-if="!j.children || !j.children.length">
                  <!-- 二级菜单标题 -->
                  <el-menu-item :index="j.key" :route="j.route">{{
                    j.title
                  }}</el-menu-item>
                </div>
                <div v-else>
                  <el-sub-menu :index="j.key">
                    <template #title>
                      <el-icon><setting /></el-icon>
                      <span>{{ j.title }}</span>
                    </template>
                    <!-- 三级菜单 -->
                    <el-menu-item-group>
                      <div v-for="(k, ix) in j.children" :key="ix">
                        <div v-if="!k.children || !k.children.length">
                          <!-- 三级级菜单标题 -->
                          <el-menu-item :index="k.key" :route="k.route">{{
                            k.title
                          }}</el-menu-item>
                        </div>
                        <div v-else>
                          <el-sub-menu :index="k.key">
                            <template #title>
                              <el-icon><setting /></el-icon>
                              <span>{{ k.title }}</span>
                            </template>
                            <!-- 四级菜单 -->
                            <el-menu-item-group>
                              <div v-for="(l, dx) in k.children" :key="dx">
                                <el-menu-item :index="l.key" :route="l.route">{{
                                  l.title
                                }}</el-menu-item>
                              </div>
                            </el-menu-item-group>
                          </el-sub-menu>
                        </div>
                      </div>
                    </el-menu-item-group>
                  </el-sub-menu>
                </div>
              </div>
            </el-menu-item-group>
          </el-sub-menu>
        </div>
      </div>
    </div>

    <!-- <div>
      <el-menu-item index="5" route="/physicalExamination">
        <el-icon><icon-menu /></el-icon>
        <template #title>体检记录</template>
      </el-menu-item>

      <el-menu-item index="6" route="/prophylacticVaccination">
        <el-icon><document /></el-icon>
        <template #title>预防接种</template>
      </el-menu-item>
    </div>
    <el-sub-menu index="9">
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
  Promotion,
} from "@element-plus/icons-vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const userObj = userStore.userObj;
const props = defineProps(["isCollapse"]);

const menuList = ref<any>([
  {
    title: "首页",
    icon: "",
    key: "1",
    route: "/home",
  },
  {
    title: "业务审批",
    icon: "",
    key: "2",
    route: "/userManagement",
    children: [
      {
        title: "待初审",
        icon: "",
        key: "21",
        route: "/pendingFirstApproval",
        children: [
          // {
          //   title: "三级初审",
          //   icon: "",
          //   key: "211",
          //   route: "/userManagement",
          //   children: [
          //     {
          //       title: "四级初审",
          //       icon: "",
          //       key: "2111",
          //       route: "/userManagement",
          //     },
          //     {
          //       title: "四级终审",
          //       icon: "",
          //       key: "2112",
          //       route: "/userManagement",
          //     },
          //   ],
          // },
          // {
          //   title: "三级终审",
          //   icon: "",
          //   key: "212",
          //   route: "/userManagement",
          // },
        ],
      },
      {
        title: "待终审",
        icon: "",
        key: "22",
        route: "/pendingFinalApproval",
      },
    ],
  },
  {
    title: "放款审批",
    icon: "",
    key: "3",
    route: "/loanApplication",
    children: [
      {
        title: "放款申请",
        icon: "",
        key: "31",
        route: "/loanApplication",
      },
      {
        title: "放款审批",
        icon: "",
        key: "32",
        route: "/loanApproval",
      },
    ],
  },
]);

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

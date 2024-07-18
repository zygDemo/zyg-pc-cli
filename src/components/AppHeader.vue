<template>
  <div id="page">
    <div class="avatar">儿童健康信息管理系统</div>
    <div class="avatar-sty">
      <el-tooltip content="Bottom center" placement="bottom" effect="light">
        <img src="../assets/Images/headerImg.jpg" alt="" srcset="" />
        <template #content>
          <div>
            <el-button link @click="logOut">退出登录</el-button>
          </div>
        </template>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const rootFontSize = ref(16);

onMounted(() => { });

const logOut = () => {
  // localStorage.removeItem("token");
  router.push("/login");
  // window.location.href = "/login";
};
</script>

<style lang="scss" scoped>
#page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.avatar-sty {
  height: 80px;
  line-height: 80px;

  img {
    margin-top: 14px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
  }
}
</style>

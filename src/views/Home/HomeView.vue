<template>
  <div>首页

    <!-- <el-button @click="btn">8888</el-button> -->
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useStore } from "@/stores/main";
import { useUserStore } from "@/stores/user";
const stores = useStore();
const user=useUserStore();
const { someState } = stores;

onMounted(() => {
  console.log(someState,useUserStore());
});

</script>

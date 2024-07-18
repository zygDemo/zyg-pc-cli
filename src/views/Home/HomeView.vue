<template>
  <div>
    <!-- 3D地球-->
    <div id="main2"></div>

    <!-- 家长显示统计 -->
    <!-- <div
      v-if="userObj.role != 'parents'"
      style="margin-top: 30px; display: flex"
    >
      <div id="main"></div>
      <div id="main1"></div>
    </div> -->
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { useStore } from "@/stores/main";
import { useUserStore } from "@/stores/user";
import { useTableStore } from "@/stores/table";
import img1 from "@/assets/Images/images1.jpeg";
import img2 from "@/assets/Images/images2.jpeg";
import img3 from "@/assets/Images/images3.jpeg";
import * as echarts from "echarts";
import "echarts-gl";

const stores = useStore();
const userStore = useUserStore(),
  tableStore = useTableStore();
const userObj = userStore.userObj;
const { someState } = stores;
const imagesList = [img1, img2, img3];
const noticeList = ref([]),
  vaccineList = ref([]),
  list = ref([
    { sex: "男", age: 12 },
    { sex: "女", age: 2 },
    { sex: "男", age: 6 },
    { sex: "女", age: 12 },
    { sex: "男", age: 12 },
  ]);

const ageRangeCountObj = reactive({
  "0~3岁": { 总人数: 0, 男: 0, 女: 0 },
  "3~6岁": { 总人数: 0, 男: 0, 女: 0 },
  "6~9岁": { 总人数: 0, 男: 0, 女: 0 },
  "9岁以上": { 总人数: 0, 男: 0, 女: 0 },
});
onMounted(() => {
  initDataAge();
  // if (userObj.role != "parents") {
  //   initData();
  //   initData1();
  // }
  initData2();
});

const initData = () => {
  let chartDom = document.getElementById("main");
  let myChart = echarts.init(chartDom);
  let option;

  // This example requires ECharts v5.5.0 or later
  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "人数",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "70%"],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: ageRangeCountObj["0~3岁"].总人数, name: "0~3岁" },
          { value: ageRangeCountObj["3~6岁"].总人数, name: "3~6岁" },
          { value: ageRangeCountObj["6~9岁"].总人数, name: "6~9岁" },
          { value: ageRangeCountObj["9岁以上"].总人数, name: "9岁以上" },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
};

const initData1 = () => {
  let chartDom = document.getElementById("main1");
  let myChart = echarts.init(chartDom);
  let option;
  option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ["product", "男", "女"],
        ["0~3岁", ageRangeCountObj["0~3岁"].男, ageRangeCountObj["0~3岁"].女],
        ["3~6岁", ageRangeCountObj["3~6岁"].男, ageRangeCountObj["3~6岁"].女],
        ["6~9岁", ageRangeCountObj["6~9岁"].男, ageRangeCountObj["6~9岁"].女],
        [
          "9岁以上",
          ageRangeCountObj["9岁以上"].男,
          ageRangeCountObj["9岁以上"].女,
        ],
      ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: "bar" }, { type: "bar" }],
  };

  option && myChart.setOption(option);
};

const initData2 = () => {
  // let url = "https://echarts.apache.org/examples";
  let chartDom = document.getElementById("main2");
  let myChart = echarts.init(chartDom);
  let option;
  option = {
    backgroundColor: "#000",
    globe: {
      baseTexture: "/api" + "/data-gl/asset/world.topo.bathy.200401.jpg",
      heightTexture: "/api" + "/data-gl/asset/world.topo.bathy.200401.jpg",
      displacementScale: 0.04,
      shading: "realistic",
      environment: "/api" + "/data-gl/asset/starfield.jpg",
      realisticMaterial: {
        roughness: 0.9,
      },
      postEffect: {
        enable: true,
      },
      light: {
        main: {
          intensity: 5,
          shadow: true,
        },
        ambientCubemap: {
          texture: "/api" + "/data-gl/asset/pisa.hdr",
          diffuseIntensity: 0.2,
        },
      },
    },
  };

  option && myChart.setOption(option);
};

const countAgeRangeWithGender = (list) => {
  let ageRangeCount = {
    "0~3岁": { 总人数: 0, 男: 0, 女: 0 },
    "3~6岁": { 总人数: 0, 男: 0, 女: 0 },
    "6~9岁": { 总人数: 0, 男: 0, 女: 0 },
    "9岁以上": { 总人数: 0, 男: 0, 女: 0 },
  };

  list.forEach((item) => {
    const { sex, age } = item;
    if (age >= 0 && age < 3) {
      ageRangeCount["0~3岁"].总人数++;
      ageRangeCount["0~3岁"][sex]++;
    } else if (age >= 3 && age < 6) {
      ageRangeCount["3~6岁"].总人数++;
      ageRangeCount["3~6岁"][sex]++;
    } else if (age >= 6 && age < 9) {
      ageRangeCount["6~9岁"].总人数++;
      ageRangeCount["6~9岁"][sex]++;
    } else if (age >= 9) {
      ageRangeCount["9岁以上"].总人数++;
      ageRangeCount["9岁以上"][sex]++;
    }
  });

  return ageRangeCount;
};
const initDataAge = () => {
  // console.log();
  const result = countAgeRangeWithGender(tableStore.archivesList);
  Object.assign(ageRangeCountObj, result);
  console.log(ageRangeCountObj);
};
</script>
<style lang="scss" scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  color: #475669;
  opacity: 0.75;
  line-height: 250px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#main {
  width: 500px;
  height: 400px;
  margin-right: 50px;
}
#main1 {
  width: 600px;
  height: 400px;
}
#main2 {
  width: 100%;
  height: 750px;
}
.card1 {
  width: 47%;
  margin-right: 3%;
  .card1-content {
    font-size: 18px;
    .el-card {
      margin-bottom: 10px;
    }
  }
}
.card2 {
  width: 48%;
  .card2-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 18px;
    .el-card {
      margin-bottom: 10px;
    }
  }
}
</style>

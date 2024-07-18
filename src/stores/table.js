import { defineStore } from "pinia";

export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    // 在这里定义 user 模块的状态
    userName: "zhuyugui",
    archivesList: [
      {
        id: 1710775841813,
        date: "2016-05-03",
        name: "王明",
        sex: "男",
        address: "上海市浦东新区沉香苑一街坊",
      },
      {
        id: 1710775852876,
        date: "2016-05-03",
        name: "李红",
        sex: "女",
        address: "上海市浦东新区沉香苑一街坊",
      },
    ],
    healthList: [
      {
        id: 1710775841816,
        name: "王明",
        sex: "男",
        height: "180cm",
        weight: "100斤",
        developmentSituation: "不良",
        diseasesHistory: "无",
        allergicHistory: "无",
      },
      {
        id: 1710775852806,
        name: "李红",
        sex: "女",
        height: "172cm",
        weight: "98斤",
        developmentSituation: "良好",
        diseasesHistory: "无",
        allergicHistory: "无",
      },
    ],
    physicalExaminationList: [
      {
        id: 1710775841816,
        name: "王明",
        sex: "男",
        height: "180cm",
        weight: "100斤",
        developmentSituation: "左5.0；右5.1",
        diseasesHistory: "正常",
        allergicHistory: "无异常",
        time: "2024-03-28",
      },
      {
        id: 1710775852806,
        name: "李红",
        sex: "女",
        height: "172cm",
        weight: "98斤",
        developmentSituation: "左4.5；右4.1",
        diseasesHistory: "正常",
        allergicHistory: "无异常",
        time: "2024-03-01",
      },
    ],
    prophylacticVaccinationList: [
      {
        id: 1710775841816,
        name: "王明",
        sex: "男",
        height: "乙肝疫苗",
        weight: "2针",
        developmentSituation: "2024-01-01",
        diseasesHistory: "2024-03-01",
        allergicHistory: "- -",
        time: "2024-03-28",
      },
      {
        id: 1710775852806,
        name: "李红",
        sex: "女",
        height: "新冠疫苗",
        weight: "3针",
        developmentSituation: "2024-02-01",
        diseasesHistory: "2024-03-01",
        allergicHistory: "2024-04-01",
        time: "2024-03-01",
      },
    ],
    // 健康评价
    healthEvaluationList: [
      {
        id: 1710775841816,
        name: "王明",
        sex: "男",
        height: "5星",
        weight: "孙医生",
        time: "2024-03-28",
      },
      {
        id: 1710775852806,
        name: "李红",
        sex: "女",
        height: "5星",
        weight: "孙医生",
        time: "2024-03-01",
      },
    ],
  }),
  getters: {
    // 添加你的用户模块的 getters
  },
  actions: {
    // 添加你的用户模块的 actions
    // setUserName(val) {
    //   this.userName = val;
    // },
    // 档案管理
    setArchivesList(val) {
      console.log(val);
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.archivesList.unshift(val);
      } else {
        // 修改
        const index = this.archivesList.findIndex((item) => item.id === val.id);
        if (index !== -1) {
          this.archivesList[index] = { ...this.archivesList[index], ...val };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },
    delArchivesList(val) {
      this.archivesList = this.archivesList.filter((item) => item.id != val.id);
    },

    // 健康状况

    setHealthList(val) {
      console.log(val);
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.healthList.unshift(val);
      } else {
        // 修改
        const index = this.healthList.findIndex((item) => item.id === val.id);
        if (index !== -1) {
          this.healthList[index] = { ...this.healthList[index], ...val };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },
    delHealthList(val) {
      this.healthList = this.healthList.filter((item) => item.id != val.id);
    },
    // 体检记录
    setPhysicalExaminationList(val) {
      console.log(val);
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.physicalExaminationList.unshift(val);
      } else {
        // 修改
        const index = this.physicalExaminationList.findIndex(
          (item) => item.id === val.id
        );
        if (index !== -1) {
          this.physicalExaminationList[index] = {
            ...this.physicalExaminationList[index],
            ...val,
          };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },
    delPhysicalExaminationList(val) {
      this.physicalExaminationList = this.physicalExaminationList.filter(
        (item) => item.id != val.id
      );
    },
    // 预防接种
    setProphylacticVaccinationList(val) {
      console.log(val);
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.prophylacticVaccinationList.unshift(val);
      } else {
        // 修改
        const index = this.prophylacticVaccinationList.findIndex(
          (item) => item.id === val.id
        );
        if (index !== -1) {
          this.prophylacticVaccinationList[index] = {
            ...this.prophylacticVaccinationList[index],
            ...val,
          };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },
    delProphylacticVaccinationList(val) {
      this.prophylacticVaccinationList =
        this.prophylacticVaccinationList.filter((item) => item.id != val.id);
    },
    // 健康评价
    setHealthEvaluationList(val) {
      console.log(val);
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.healthEvaluationList.unshift(val);
      } else {
        // 修改
        const index = this.healthEvaluationList.findIndex(
          (item) => item.id === val.id
        );
        if (index !== -1) {
          this.healthEvaluationList[index] = {
            ...this.healthEvaluationList[index],
            ...val,
          };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },
    delHealthEvaluationList(val) {
      this.healthEvaluationList = this.healthEvaluationList.filter(
        (item) => item.id != val.id
      );
    },
  },
  persist: {
    key: "tableInfo",
    storage: window.localStorage,
  },
});

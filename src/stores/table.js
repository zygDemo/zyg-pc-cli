import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { calculateAge } from "@/utils/index";
export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    // 在这里定义 user 模块的状态
    userName: "zhuyugui",
    archivesList: [
      {
        id: 1710775841813,
        date: "2016-05-03", //出生日期
        name: "王明",
        sex: "男",
        address: "上海市浦东新区沉香苑一街坊",
        idNumber: "412823200909044112",
        age: "1",
        photo: "",
        height: "180cm",
        weight: "100斤",
        developmentSituation: "不良", //生长发育情况
        diseasesHistory: "无", //疾病史
        allergicHistory: "无", //过敏史
        vision: "左5.0；右5.1", //视力
        cardiopulmonaryCondition: "正常", //心肺状况
        ctCondition: "无异常", //ct状况
        healthExamTime: "2024-03-28", //体检时间
        nexthealthExamTime: "2024-03-28", //下次体检时间
        time: "2024-03-28", // 体检日期
        inoculateType: "乙肝疫苗",
        inoculantTime1: "",
        inoculantTime2: "",
        inoculantTime3: "",
        inoculate: "2024-03-28", //下次接种时间
        bmiNumber: "", //
        bmiClass: "", //<18.5偏瘦 <24正常 <28偏胖 >28肥胖
        remark: "", //备注
      },
      {
        id: 1710775852876,
        date: "2016-05-03", //出生日期
        name: "李红",
        sex: "女",
        address: "上海市浦东新区沉香苑",
        idNumber: "412823201009044112",
        age: "10",
        photo: "",
        height: "180cm",
        weight: "100斤",
        developmentSituation: "不良", //生长发育情况
        diseasesHistory: "无", //疾病史
        allergicHistory: "无", //过敏史
        vision: "左5.0；右5.1", //视力
        cardiopulmonaryCondition: "正常", //心肺状况
        ctCondition: "无异常", //ct状况
        healthExamTime: "2024-03-28", //体检时间
        nexthealthExamTime: "", //下次体检时间
        time: "2024-03-28", // 体检日期
        inoculateType: "乙肝疫苗",
        inoculantTime1: "",
        inoculantTime2: "",
        inoculantTime3: "",
        inoculate: "2024-03-28", //下次接种时间
        bmiNumber: "", //
        bmiClass: "", //<18.5偏瘦 <24正常 <28偏胖 >28肥胖
        remark: "",
      },
      {
        id: 1710775852871,
        date: "2016-05-03", //出生日期
        name: "李华",
        sex: "男",
        address: "郑州市金水区",
        idNumber: "412823201009044112",
        age: "10",
        photo: "",
        height: "180cm",
        weight: "100斤",
        developmentSituation: "不良", //生长发育情况
        diseasesHistory: "无", //疾病史
        allergicHistory: "无", //过敏史
        vision: "左5.0；右5.1", //视力
        cardiopulmonaryCondition: "正常", //心肺状况
        ctCondition: "无异常", //ct状况
        healthExamTime: "2024-03-28", //体检时间
        nexthealthExamTime: "", //下次体检时间
        time: "2024-03-28", // 体检日期
        inoculateType: "乙肝疫苗",
        inoculantTime1: "",
        inoculantTime2: "",
        inoculantTime3: "",
        inoculate: "2024-03-28", //下次接种时间
        bmiNumber: "", //
        bmiClass: "", //<18.5偏瘦 <24正常 <28偏胖 >28肥胖
        remark: "",
      },
      {
        id: 1710775852872,
        date: "2016-05-03", //出生日期
        name: "王亮",
        sex: "男",
        address: "郑州市金水区",
        idNumber: "412823200909044812",
        age: "10",
        photo:
          "https://pic2.zhimg.com/80/v2-ed4ab0d3bf9fc671b768819557c06055_1440w.webp",
        height: "170cm",
        weight: "140斤",
        developmentSituation: "不良", //生长发育情况
        diseasesHistory: "无", //疾病史
        allergicHistory: "无", //过敏史
        vision: "左5.0；右5.1", //视力
        cardiopulmonaryCondition: "正常", //心肺状况
        ctCondition: "无异常", //ct状况
        healthExamTime: "2024-03-28", //体检时间
        nexthealthExamTime: "", //下次体检时间
        time: "2024-03-28", // 体检日期
        inoculateType: "乙肝疫苗",
        inoculantTime1: "",
        inoculantTime2: "",
        inoculantTime3: "",
        inoculate: "2024-03-28", //下次接种时间
        bmiNumber: "", //
        bmiClass: "", //<18.5偏瘦 <24正常 <28偏胖 >28肥胖
        remark: "",
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
        id: 1710775841813,
        name: "王明",
        sex: "男",
        height: "180cm",
        weight: "100斤",
        vision: "左5.0；右5.1", //视力
        cardiopulmonaryCondition: "正常", //心肺状况
        ctCondition: "无异常", //ct状况
        healthExamTime: "2024-03-28", //体检时间
        nexthealthExamTime: "2024-03-28", //下次体检时间
        time: "2024-03-28", // 体检日期
      },
      {
        id: 1710775852876,
        name: "李红",
        sex: "女",
        height: "172cm",
        weight: "98斤",
        vision: "左5.0；右5.1", //视力
        cardiopulmonaryCondition: "正常", //心肺状况
        ctCondition: "无异常", //ct状况
        healthExamTime: "2024-03-28", //体检时间
        nexthealthExamTime: "", //下次体检时间
        time: "2024-03-28", // 体检日期
      },
    ],
    prophylacticVaccinationList: [
      {
        id: 1710775841813,
        name: "王明",
        sex: "男",
        inoculateType: "乙肝疫苗",
        inoculantTime1: "",
        inoculantTime2: "",
        inoculantTime3: "",
        inoculate: "2024-03-28", //下次接种时间
      },
      {
        id: 1710775852876,
        name: "李红",
        sex: "女",
        inoculateType: "新冠疫苗",
        inoculantTime1: "2024-03-01",
        inoculantTime2: "",
        inoculantTime3: "",
        inoculate: "2024-03-01",
      },
    ],
    // 健康评价
    healthEvaluationList: [
      {
        id: 1710775841816,
        name: "王明",
        sex: "男",
        height: "良好",
        weight: "22",
        time: "2024-03-28",
      },
      {
        id: 1710775852806,
        name: "李红",
        sex: "女",
        height: "一般",
        weight: "20",
        time: "2024-03-01",
      },
    ],
    noticeList: [
      {
        id: 1710775841816,
        title: "公告标题",
        content: "公告内容",
        switch: "1", //开关
        time: "2024-03-28",
      },
      {
        id: 1710775852806,
        title: "通知标题",
        content: "通知内容",
        switch: "2",
        time: "2024-03-01",
      },
    ],
    vaccineList: [
      {
        id: 1710775841811,
        title: "新冠疫苗",
        content: "3000",
        switch: "1", //开关
        time: "2024-03-28",
      },
      {
        id: 1710775852801,
        title: "乙肝疫苗",
        content: "299",
        switch: "2",
        time: "2024-03-01",
      },
      {
        id: 1710775852811,
        title: "卡介苗",
        content: "299",
        switch: "2",
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
        val.age = calculateAge(val.idNumber);
        this.archivesList.unshift(val);
      } else {
        // 修改
        const index = this.archivesList.findIndex((item) => item.id === val.id);
        val.age = calculateAge(val.idNumber);
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
    addPhysicalExaminationList(val) {
      console.log(val, this.physicalExaminationList);
      if (val.id) {
        const index = this.physicalExaminationList.findIndex(
          (item) => item.id === val.id
        );
        const idx = this.archivesList.findIndex((item) => item.id === val.id);
        if (index != -1) {
          ElMessage({
            message: "该人员已存在！",
            type: "warning",
            plain: true,
          });
          return;
        } else {
          if (idx != -1) {
            this.physicalExaminationList.unshift(this.archivesList[idx]);
          } else {
            this.physicalExaminationList.unshift(val);
          }
        }
      }
    },
    setPhysicalExaminationList(val) {
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.archivesList.unshift(val);
      } else {
        console.log(val, "修改");
        // 修改
        const index = this.archivesList.findIndex((item) => item.id === val.id);
        console.log(index);
        if (index !== -1) {
          this.archivesList[index] = {
            ...this.archivesList[index],
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
        this.archivesList.unshift(val);
      } else {
        // 修改
        const index = this.archivesList.findIndex((item) => item.id === val.id);
        if (index !== -1) {
          this.archivesList[index] = {
            ...this.archivesList[index],
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
    // 公告发布
    setNoticeList(val) {
      console.log(val);
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.noticeList.unshift(val);
      } else {
        // 修改
        const index = this.noticeList.findIndex((item) => item.id === val.id);
        if (index !== -1) {
          this.noticeList[index] = {
            ...this.noticeList[index],
            ...val,
          };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },
    delNoticeList(id) {
      this.noticeList = this.noticeList.filter((item) => item.id !== id);
    },
    // 疫苗列表
    setVaccineList(val) {
      console.log(val);
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
        this.vaccineList.unshift(val);
      } else {
        // 修改
        const index = this.vaccineList.findIndex((item) => item.id === val.id);
        if (index !== -1) {
          this.vaccineList[index] = {
            ...this.vaccineList[index],
            ...val,
          };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },
    delVaccineList(id) {
      this.vaccineList = this.vaccineList.filter((item) => item.id !== id);
    },
  },
  persist: {
    key: "tableInfo",
    storage: window.localStorage,
  },
});

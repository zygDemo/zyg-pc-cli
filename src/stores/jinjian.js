import { defineStore } from "pinia";
import { postRefreshToken } from "@/api/jinjian.js";

export const useJinJianStore = defineStore({
  id: "useJinJianStore",
  state: () => ({
    // 在这里定义 user 模块的状态
    jinJianObj: {
      accountManagerId: "", //客户经理
      applyInfoId: "", //预审批申请Id
      fileList1: [], //身份证正
      fileList2: [], //身份证反
      fileList3: [], //行驶证
    },
    jinJianToken: "",
    jinJianExpire: "", //token过期时间
    userList: [
      {
        id: 1,
        account: "admin",
        password: "123456",
        role: "admin",
        phone: "18599999933",
        // roles: ["admin"],
      },
    ],
    activePath: "HomePage", //layout记录底部tabBar选中
  }),
  getters: {
    // 添加你的用户模块的 getters
  },
  actions: {
    setActivePath(path) {
      this.activePath = path || "HomePage";
    },

    // 获取用户进件token
    setJinJianToken(token) {
      this.jinJianToken = token || "";
    },
    setJinJianExpire(expire) {
      this.jinJianExpire = expire || "";
      // 600秒后执行刷新token操作
      setTimeout(() => {
        // this.setJinJianToken(obj.token);
        this.refreshToken();
      }, Number(this.jinJianExpire - 600) * 1000); //距离失效提前600秒刷新token
    },
    // 添加你的用户模块的 actions
    setJinJianObj(obj) {
      Object.assign(this.jinJianObj, obj);
    },
    // 注册
    setUserList(val) {
      // this.userList = [...this.userList, ...val];
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000); //生成UUID
        this.userList.unshift(val);
      } else {
        // 修改
        const index = this.userList.findIndex((item) => item.id === val.id);
        if (index !== -1) {
          this.userList[index] = { ...this.userList[index], ...val };
        } else {
          console.log("Element with id " + id + " 找不到");
        }
      }
    },

    delUserList(val) {
      this.userList = this.userList.filter((item) => item.id != val.id);
    },
    async refreshToken() {
      const res = await postRefreshToken();
      console.log(res, "刷新了");
      if (res.code == "00000") {
        const { accessToken, expire } = res?.data;
        this.setJinJianToken(accessToken);
        this.setJinJianExpire(expire);
      }
    },
  },
  persist: {
    key: "useJinJianStore",
    storage: window.sessionStorage,
  },
});

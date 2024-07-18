import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    // 在这里定义 user 模块的状态
    userObj:{},
    userList: [
      {
        id: 1,
        account: "admin",
        password: "123456",
        role:'admin',
        phone: "18538529932",
        // roles: ["admin"],
      },
      {
        id: 2,
        account: "user",
        password: "123456",
        role:'user',
        phone: "15236969032",
        // roles: ["user"],
      },
    ],
  }),
  getters: {
    // 添加你的用户模块的 getters
  },
  actions: {
    // 添加你的用户模块的 actions
    setUserObj(val) {
      Object.assign(this.userObj, val);
    },
    // 注册
    setUserList(val) {
      // this.userList = [...this.userList, ...val];
      if (!val.id) {
        //   新增
        val.id = Date.now() + Math.floor(Math.random() * 1000);
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
    
  },
  persist: {
    key:'userInfo',
    storage: window.localStorage,
  },
});

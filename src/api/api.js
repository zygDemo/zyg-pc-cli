import axios from "axios";
import request from "../request/request";
import { computed } from "vue";
import { useJinJianStore } from "@/stores/jinjian.js";

const jinJianStore = useJinJianStore();
const jinJianToken = computed(() => jinJianStore.jinJianToken);

// 封装上传文件接口
export const uploadFile = (file) => {
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": jinJianToken.value || "",
    },
    baseURL:
      import.meta.env.MODE !== "development"
        ? request.defaults.baseURL
        : "/proxyApi",
  };

  const formData = new FormData();
  formData.append("files", file);
  return axios.post("/resource/fileResource/uploadFiles", formData, config);
};

// 文件预览
export const getFileResource = (data) =>
  request.get(`/resource/fileResource/image`, {
    responseType: "blob",
    params: data,
  });

// 获取省市区列表
// export const getProvinceCityAreaList = (param) =>
//   request.get(`/api/diversion/provinceCityAreaList`);

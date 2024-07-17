import request from "../request/request";

// 身份证ocr识别
export const postOcrIdentityCard = (data) =>
  request.post("/resource/ocr/identityCard", data);

// 提交身份证信息
export const postIdentityCard = (data) =>
  request.post("/order/ocrIdentityCard", data);

// 根据预审批申请id查询身份证信息
export const getDetailsByApplyInfo = (applyInfoId) =>
  request.get(`/order/ocrIdentityCard/getDetailsByApplyInfoId/${applyInfoId}`);

// 钉钉验证码登录
export const verifyDingLogin = (data) =>
  request.post("/order/user/login", data);

// 获取钉钉验证码
export const verifyDingCode = (data) =>
  request.post("/order/user/validate/send", data);

// 行驶证ocr识别
export const postOcrVehicleInfo = (data) =>
  request.post("/resource/ocr/vehicleInfo", data);

// 根据预审批id查询行驶证信息
export const getOcrVehicleList = (applyInfoId) =>
  request.get(`/order/ocrVehicleInfo/getDetailsByApplyInfoId/${applyInfoId}`);

// 行驶证查询车型
export const postCarModel = (data) =>
  request.post("/order/car/modelInfo", data);

// 提交行驶证信息
export const postVehicleCard = (data) =>
  request.post("/order/ocrVehicleInfo/insertOcrVehicleInfo", data);

// 其他信息提交
export const postOtherApplyInfo = (data) =>
  request.post("/order/approvalApplyInfo", data);

// 刷新token
export const postRefreshToken = (data) =>
  request.post("/auth/authorize/token/refresh", data);

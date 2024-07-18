// 常用工具函数
import router from "@/router";


export const developmentDialogFun = () => {
  showDialog({
    title: "提示",
    message: "功能正在努力开发中，敬请期待。",
    theme: "round-button",
    confirmButtonColor: "#0D9AEB",
  }).then(() => {
    // on close
  });

  return;
};

export const checkProcedureDialogFun = (text) => {
  showDialog({
    title: "提示",
    message: `${text ?? "请先完善其他信息"}`,
    theme: "round-button",
    confirmButtonColor: "#0D9AEB",
  }).then(() => {
    // on close
    router.push({ path: "/orderDetails" });
  });

  return;
};

// 深拷贝
export const structedClone = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj; // 如果obj不是对象或者为null，直接返回
  }

  let clone = Array.isArray(obj) ? [] : {}; // 创建与obj相同类型的空对象或数组

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = structedClone(obj[key]); // 递归调用structedClone函数，对每个属性进行深拷贝
    }
  }

  return clone; // 返回深拷贝后的对象
};
// 复制
export const copyToClipboard = (text) => {
  // 创建一个临时的 textarea 元素
  let textarea = document.createElement("textarea");

  // 设置 textarea 的值为要复制的文本
  textarea.value = text;

  // 将 textarea 添加到文档中
  document.body.appendChild(textarea);

  // 选中 textarea 中的文本
  textarea.select();

  // 执行复制操作
  document.execCommand("copy");

  // 移除 textarea 元素
  document.body.removeChild(textarea);
  showSuccessToast("复制成功");
};
// 拨打手机号
export const makeCall = (phone) => {
  // 要拨打的电话号码
  window.location.href = "tel:" + phone;
};

// 判断权限
export const JudgmentAuthority = (arr1, arr2) => {
  if (!arr1 || !arr2) return false;
  return arr1.some((item) => arr2.includes(item));
};

// 通过身份证号计算年龄
export const CalculateAge = (idCardNumber) => {
  // 获取出生日期的字符串
  const birthDateString = idCardNumber.substring(6, 14);

  // 将出生日期字符串转换为 Date 对象
  const birthDate = new Date(
    birthDateString.substring(0, 4),
    birthDateString.substring(4, 6) - 1,
    birthDateString.substring(6, 8)
  );

  // 当前日期
  const currentDate = new Date();

  // 计算年龄
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // 如果当前月份小于出生月份，或者当前月份等于出生月份但当前日期小于出生日期，则年龄减一
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const determineLinkType = (url) => {
  // 获取链接的文件名
  const fileName = url.substring(url.lastIndexOf("/") + 1).toLowerCase();

  // 文件类型映射对象
  const fileTypeMap = {
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    pdf: "pdf",
    doc: "word",
    docx: "word",
    xls: "excel",
    xlsx: "excel",
    // 添加更多文件类型的映射
  };

  // 获取文件扩展名
  const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);

  // 根据文件扩展名判断链接类型
  return fileTypeMap[fileExtension] || "unknown";
};

/**
 * 格式化数字，添加千位分隔符-千分位
 * @param {number||string} number - 要格式化的数字
 * @param {number||string} decimal - 要保留的小数位数
 * @returns {string} - 格式化后的数字字符串
 */
export const formatNumberWithCommas = (number, decimal) => {
  let numberVal = Number(number);
  if (decimal) {
    numberVal = numberVal.toFixed(Number(decimal));
  }

  let formattedNumber = new Intl.NumberFormat().format(numberVal);
  return formattedNumber || "";
};

/**
 *
 * @param {*} dateString 时间字符串
 * @param {*} type 格式化类型 "YYYY-MM-DD"或"YYYY年MM月DD日" 不传为"YYYY/MM/DD"
 * @returns
 */
export const formatDate = (dateString, type) => {
  if (!!dateString) {
    if (type === "YYYY-MM-DD") {
      const date = new Date(dateString.replace(/-/g, "/"));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1，并且补零
      const day = String(date.getDate()).padStart(2, "0"); // 补零
      return `${year}-${month}-${day}`;
    } else if (type === "YYYY年MM月DD日") {
      const date = new Date(dateString.replace(/-/g, "/"));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日`;
    } else {
      const date = new Date(dateString.replace(/-/g, "/"));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}/${month}/${day}`;
    }
  }
};

/**
 *
 * @param {*} phoneNumber 手机号脱敏
 * @returns
 */
export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return "";
  } else {
    // 使用正则表达式将手机号中间四位数字替换为星号
    return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }
};

/**
 * 获取全局对象
 * @returns {Object} 全局对象
 */
export const getGlobal = () => {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("无法找到全局对象");
};

/**
 * 新用户登陆，如果是新用户或获取不到手机号去重新登陆
 * @param {Object} userInfo 用户信息以及登陆跳转路径
 * @param {String} userInfo.phone 登陆人手机号
 * @param {Number} userInfo.departmentId 部门id区分佳客以及其他
 * @param {String} userInfo.url 登陆后重新回到的页面
 *
 * @returns
 *
 */

export const miniApplogin = (userInfo) => {
  console.log("dengl");
  // 没有手机号跳转登陆
  if (!userInfo?.phone) {
    console.log(userInfo);
    showDialog({
      title: "提示",
      message: "登录后，体验更多精彩功能，立即登录吧!",
      // confirmButtonColor: "#ee0a24",
      confirmButtonText: "去登录",
      theme: "round-button",
    })
      .then(() => {
        if (!userInfo.departmentId) {
          wx.miniProgram.navigateTo({
            url: `/pages/Login/login`,
          });
        } else {
          wx.miniProgram.reLaunch({
            url: userInfo.url,
          });
        }
      })
      .catch(() => {
        // on cancel
      });
  }
};

//月息转换
export const interestTranform = (number) => {
  const num = Number(number).toFixed(3);
  console.log("num", num);
  const arr = num.toString().split(".");
  const int = arr[0]?.replace(/^0+/, "");
  const decimals = arr[1]?.replace(/^0+/, "");
  return `${int ? `${int}分` : ""}${decimals ? `${decimals / 100}厘` : ""}`;
};

/**
 * blob转文件流
 * @param {*} blob 
 * @param {*} fileName 文件名 默认image.jpg
 * @param {*} type 文件类型 默认image/jpeg
 * @returns
 */
export const blobToFile = (
  blob,
  fileName = "image.jpg",
  type = "image/jpeg"
) => {
  const imageBlob = new Blob([blob], { type: type });
  const imageFile = new File([imageBlob], fileName, { type: type });
  return imageFile;
};


export const BrowserSize = () => {
  var docEl = document.documentElement,
    clientWidth = 1920,
    clientHeight = 1080;
  // console.log(docEl);
  clientWidth = docEl.clientWidth;
  clientHeight = docEl.clientHeight;
  if (!clientWidth) return;
  if (!docEl.addEventListener) return;
  // clientWidth = 1920;

  // if (clientWidth < 1920) {
  //   clientWidth = clientWidth;
  // }
  // console.log(clientWidth, "dsjj", clientHeight);
  docEl.style.fontSize = clientWidth / 10 + "px";
};
// 根据屏幕宽度动态计算 rootValue
export const getRootFontSize = () => {
  const screenWidth = document.documentElement.clientWidth ?? 1920;
  // 根据实际需求计算出合适的 rootValue
  let rootValue = screenWidth / 10; // 例如，假设以屏幕宽度的 1/10 作为 rootValue
  return rootValue;
};

//useFlexibleRem.ts

export function useFlexibleRem() {
  const docEl = document.documentElement;
  const dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem dynamically based on screen width
  function setRemUnit() {
    const designWidth = 1920; // 设计稿宽度
    const minWidth = 1024; // 最小适配的屏幕宽度
    const screenWidth = Math.max(docEl.clientWidth, minWidth); // 当前屏幕宽度与最小适配宽度比较
    const rem = (screenWidth / designWidth) * 100; // 1rem = 100px at designWidth
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    const fakeBody = document.createElement("body");
    const testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
}

export const shortcuts = [
  {
    text: "今天",
    value: new Date(),
  },
  {
    text: "昨天",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "一周前",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

export const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
export const disabledNowDate = (time) => {
  return time.getTime() < Date.now();
};
export const dateFormat = (date) => {
  if (date) {
    date = new Date(date);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
  } else {
    return '- -'
  }
  
};

/**
 * 通过身份证号计算年龄
 * @param {String} idNumber 
 * @returns 
 */
export const calculateAge=(idNumber)=> {
  // 假设身份证号前六位为出生年月日，例如：19901010
  const birthdayString = idNumber.substring(6, 14); // 获取出生年月日部分
  const year = birthdayString.substring(0, 4);
  const month = birthdayString.substring(4, 6);
  const day = birthdayString.substring(6, 8);

  const today = new Date();
  const birthDate = new Date(year, month - 1, day); // 月份减去1（JavaScript中月份从0开始）
  
  let age = today.getFullYear() - birthDate.getFullYear(); // 计算年龄

  // 检查是否已过生日
  if (today.getMonth() < birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--; // 如果还没过生日，则年龄减一
  }

  return age;
}

// 示例用法
const idNumber = "510181199010101234"; // 身份证号码
const age = calculateAge(idNumber);
console.log("年龄为：" + age);

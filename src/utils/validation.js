// 校验银行卡号
export const validateCardNumber = (value, rule) => {
  if (/^\d{16,19}$/.test(value)) {
    return true;
  } else {
    return "银行卡号格式不正确";
  }
};

// 校验手机号码
export const validatePhone = (value, rule) => {
  if (/^1[23456789]\d{9}$/.test(value)) {
    return true;
  } else {
    return "手机号码格式不正确";
  }
};

// 校验身份证号码
export const validateIDCard = (value) => {
  const pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
  if (pattern.test(value)) {
    return true;
  } else {
    return "身份证号格式不正确";
  }
};

// 校验开户行
export const validateBank = (value) => {
  const pattern = "未知银行卡号";
  if (value !== pattern) {
    return true;
  } else {
    return "未知银行，请输入正确银行卡号";
  }
};

// 校验是否为空和格式是否正确
/**
 * @param {string} value - 参数  值
 * @param {string} label - 单元格标题名
 * @param {string} type - 单元格类型 select --> 选择框；input --> 输入框
 * @param {RegExp} regular - 正则表达式
 * @return  返回
 */
export const Validator = (value, label, type, regular) => {
  return new Promise((resolve, reject) => {
    if (!value) {
      if (type === "select") {
        reject(`请选择${label}`);
      } else if (type === "input") {
        reject(`${label}不能为空`);
      }
    }
    if (regular) {
      if (regular.test(value)) {
        resolve(true);
      } else {
        reject(`${label}有误`);
      }
    }
    resolve(true);
  });
};

/**
 * 指定小代码值转中文对照
 * @param dataList 小代码类型
 * @param type 小代码类型
 * @param value 小代码的值
 * return 小代码的中文
 */
export const getCodeTypeNameByValue = (dataList, type, value) =>{
  for (let i = 0; i < dataList.length; i++) {
      let data = dataList[i];
      if (data['codeKey'] == value && data['codeType'] == type) {
          return data['codeValue'];
      }
  }
  return '无匹配';
}
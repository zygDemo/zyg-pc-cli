// class QueryClass {
	// 通过value找key
	export const findKeyByValue = (arr, value) =>{
		console.log(arr,value);
		const obj = arr.find(item => Object.values(item)[0] === value);
		return obj ? Object.keys(obj)[0] : null; // 如果没有找到匹配的姓名，返回 null 或其他适当的值
	};
	export const ObjfindKeyByValue = (obj, key) =>{
		return obj[key] ? obj[key] : null  // 如果没有找到匹配的姓名，返回 null 或其他适当的值
	};

	// 通过key找value
	export const findValueByKey = (arr, key) =>{
		const obj = arr.find(item => key in item);
		return obj ? obj[key] : null;
	};
	// 通过NameVal的值找CodeVal的值
	/**
	 * @param {string} KeyName - 参数  输入参数的键名
	 * @param {string} CodeValName - 参数  要返回值的键名(不传为obj.value)
	 * @return  返回值的描述
	 */
	export const findCodeValByNameVal = (arr, NameVal, KeyName, CodeValName) =>{
		const obj = arr.find(item => item[KeyName] == NameVal);
		return obj ? obj[CodeValName ? CodeValName : 'value'] : null;
	};

	/**
	 * 根据指定属性的值查找数组中的对象，并返回该对象指定属性的值（默认为 value）。
	 * @param {Array} arr - 数据数组。
	 * @param {string|number} CodeVal - 查找的属性值。
	 * @param {string} KeyName - 查找的属性名称，默认为 'name'。
	 * @param {string} NameValName - 要返回的属性名称，默认为 'name'。
	 * @return {string|number|null} 返回查找到的属性值，如果未找到则返回 null。
	 */

	export const findNameValByCodeVal = (arr, CodeVal, KeyName, NameValName) =>{
		if (arr) {
			const obj = arr.find(item => item[KeyName] == CodeVal);
			return obj ? obj[NameValName] : null;
		} else {
			return null;
		}

	};

	/**
	 * @param {Array} arr - 数据数组 [{ "1": "身份证" },{ "2": "户口簿" }]。
	 * @return {Array} - 返回数据 ['身份证' ,'户口簿' ]。
	 */
	export const findArrayVal = (arr) =>{
		const arrayVal = arr.map(item => Object.values(item)[0]);
		return arrayVal;
	}

	/**
	 * @param {Array} arr - 数据数组 [{ "1": "身份证" },{ "2": "户口簿" }]。
	 * @return {Array} - 返回数据 [{ value: '1', name: '身份证' },{ value: '2', name: '户口簿' }]。
	 */
	export const transformedArray = (arr) =>{
		const transformedList = arr.map((item) => {
			const key = Object.keys(item)[0];
			const value = item[key];
			return { value: key, name: value };
		});
		return transformedList;
	}
// }

// export default QueryClass;
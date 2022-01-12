//1.格式化--时间
export function timeStr(dataStr) {
	var date = new Date(dataStr);
	var y = date.getFullYear();

	var m = date.getMonth() + 1;
	m = m < 10 ? "0" + m : m;

	var d = date.getDate();
	d = d < 10 ? "0" + d : d;

	var h = date.getHours();
	h = h < 10 ? "0" + h : h;

	//获得分
	var mm = date.getMinutes();
	mm = mm < 10 ? "0" + mm : mm;

	//获得秒
	var ss = date.getSeconds();
	ss = ss < 10 ? "0" + ss : ss;
	return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
}
 //2.时间戳转为yy-mm-dd hh:mm:ss
 export function timeFun(unixtimestamp) {
	var unixtimestamp = new Date(unixtimestamp);
	var year = 1900 + unixtimestamp.getYear();
	var month = "0" + (unixtimestamp.getMonth() + 1);
	var date = "0" + unixtimestamp.getDate();
	var hour = "0" + unixtimestamp.getHours();
	var minute = "0" + unixtimestamp.getMinutes();
	var second = "0" + unixtimestamp.getSeconds();
	return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date
			.length) +
		" " + hour.substring(hour.length - 2, hour.length) + ":" +
		minute.substring(minute.length - 2, minute.length) + ":" +
		second.substring(second.length - 2, second.length);
}

//3.计算对象数组中某个属性合计
export function countTotal (arr, keyName) {
	let $total = 0;
	$total = arr.reduce(function (total, currentValue, currentIndex, arr){
			return currentValue[keyName] ? (total + currentValue[keyName]) : total;
	}, 0);
	return $total;
}


/** 4.获取两个日期之间的间隔日期
 * @param { Date | number | string } startTime 开始时间 标准时间格式 时间戳格式 字符串格式(2008-08-08,2008-8-8,2008-08-8,2008-8-08)
 * @param { Date | number | string } endTime 结束时间 标准时间格式 时间戳格式 字符串格式(2008-08-08,2008-8-8,2008-08-8,2008-8-08)
 *  */
 export function getBetweenDate(startTime,endTime) {
	
	let start = new Date(startTime)
	let end = new Date(endTime)
	const resultTime = []
	// 当 开始时间小于结束时间的时候进入循环
	while (start <= end) {
			let getDay = start.getDate()
			// 月份需要加 1
			let getMonth = start.getMonth() + 1
			let getYear = start.getFullYear()
			/**
			 * 拼接时间格式
			 * (getMonth >= 10 ? `${getMonth}` : `0${getMonth}`) 自动给 小于10的时间前面补0
			 */
			let setTime =
					`${getYear}年` +
					(getMonth >= 10 ? `${getMonth}` : `0${getMonth}`) +
					'月' +
					(getDay >= 10 ? `${getDay}` : `0${getDay}`)+'日'

			resultTime.push(setTime)
			/**
			 * 重新设置开始时间
			 * 使用 setFullYear() 方法会自动将时间累加，返回的是时间戳格式
			 * 使用 new Date() 将时间重新设置为标准时间
			 * getMonth - 1 将月份时间重新还原
			 */
			start = new Date(start.setFullYear(getYear, getMonth - 1, getDay + 1))
	}
	return resultTime
}


import { reactive } from "vue";
export const addDormitoryMixin = {
	setup(){
			const addDormitory=reactive({
					addproName:[ //项目名称
						{required: true, message: '请选择项目名称', trigger:  ['blur','change']  }
					],
					addVerson:[ //版本号
						{required: true, message: '请输入版本号', trigger: 'blur' },
						{ validator: validateInput, trigger: 'blur' }
					],
					addStatus:[ //状态
						{required: true, message: '请选择状态', trigger:  ['blur','change']  }
					],
			})

			return{
				addDormitory
			}
		
	}
};

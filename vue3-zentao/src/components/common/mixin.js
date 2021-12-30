//格式化--时间
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

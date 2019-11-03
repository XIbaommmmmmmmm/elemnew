//功能添加cookie
function addCookie(cookieKey,cookieValue,time){
	// document.cookie = "qq =323232;max-age=99999"
	document.cookie = cookieKey+"="+cookieValue+";max-age="+time;
}
//删除cookie
function delCookie(cookieKey){
	addCookie(cookieKey,"",-1);
}
//获取某个cookie的值,key对应的形式上的value值
function getCookie(cookieKey){
	//获取所有cookie,通过“；”分割，分割符分割
	var arr = document.cookie.split(";");
	for(var i =0;i<arr.length;i++){
		var arr2 = arr[i].split("=");
		if(cookieKey == arr2[0].trim()){
			return arr2[1].trim();
		}
	}
}
//判断cookie的key之前是否存在
function isCookieKey(cookieKey){
	var arr = document.cookie.split(";");
	for(var i =0;i<arr.length;i++){
		var arr2 = arr[i].split("=");
		if(cookieKey == arr2[0].trim()){
			return true;   //存在返回true;
		}
	}
	return false; //不存在返回false;
}
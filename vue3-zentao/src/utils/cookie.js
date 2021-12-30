//读取cookie
export function getCookie (param) {
    var c_param = '';
    if (document.cookie.length >0) {
        var arr = document.cookie.split(';'); //切割显示格式
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=') //再次切割
            if (arr2[0].indexOf(param) != -1) {
                c_param = arr2[1];
            }
        }
        return c_param;
    }
}

// function getCookie(corTicket) {
//     var name = cname + '='
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i].trim();
//         if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
//     }
//     return ""
// }
// 需求：
//      1.需要配置根路径
//      2.设置请求头
//      3.complete毁掉函数里验证token在后台的有效性；

// ajax提前过滤
$.ajaxPrefilter(function (data) {
    var base = "http://ajax.frontend.itheima.net";
    data.url = base + data.url;

    if (data.url.indexOf("/my/") != -1) {
        data.headers = {
            "Authorization": localStorage.getItem("token"),
        };

        // complete函数，在ajax请求完成（无论成功还是失败）之后触发
        data.complete = function (xhr) {
            if (xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！") {
                // 删除 过期 token
                localStorage.removeItem("token");
                location.href = '/login.html'
            }
        }
    }
    
})
if (localStorage.getItem("token") == null) {
    location.href = '/login.html';
}
// ----------------------------------------------------请求个人信息
$.ajax({
    url: "/my/userinfo",
    // 设置请求头：
    success: function(res) {
        // console.log(res);
        if (res.status == 0) {
            // 名称：有昵称就昵称、不然就是用户名；
            var name = res.data.nickname || res.data.username;
            $(".username").text(name);
            
            // 测试代码：
            // res.data.user_pic = undefined;
            // name = "aaa";
            
            // 头像：如果有头像数据
            if (res.data.user_pic) {
              // 
              $(".layui-nav-img").show().attr("src", res.data.user_pic);
              $(".avatar").hide();
            }
            // 测试：没有头像数据的时候
            else {
              // 截取name名字上第一个字符；
              var t = name.substr(0, 1);
              // 英文字符：小写变为大写：字符串.toUpperCase()
              t = t.toUpperCase();
            
              // show:会让元素变为行内元素；
              $(".avatar").show().css("display", "inline-block").text(t);
              $(".layui-nav-img").hide()
            }
  
        }
    },
    // 请求失败后调用
    fail: function () { },
    
})

// -------------------------------------------------------退出
$("#logout").on("click", function () {
    layer.confirm('您确定要退出吗?', {
        icon: 3,
        title: '退出窗口'
    }, function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = '/login.html'
        // 用户关闭窗口 index: number值
        layer.close(index);
    });
})
  